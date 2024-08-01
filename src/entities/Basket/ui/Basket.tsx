"use client";
import { Dropdown, Badge, Typography, Flex, Button } from "antd";
import Image from "next/image";
import styles from "./Basket.module.scss";
import useTheme from "@/shared/hook/useTheme";
import { Products } from "@/shared/types/products";
import Title from "antd/es/typography/Title";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";
import { useLocale } from "next-intl";
import ucFirst from "@/shared/tool/ucFirst";
import beautifulCost from "@/shared/tool/beautifulCost";
import useBasketStore from "@/_app/store/basket";
import { Suspense, useEffect, useState } from "react";
const { Text } = Typography;
import type { MenuProps } from "antd";

export default function Basket({ city }: { city: string }) {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalSumFake, setTotalSumFake] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const { isDarkThemeImage } = useTheme();

  const { BasketData } = useBasketStore((state) => ({
    BasketData: state.BasketData,
  }));

  useEffect(() => {
    let TotalSumBasket = 0;
    let TotalSumBasketFake = 0;

  // Итог
  setTotalSum(0);
  // Скидка
  setSale(0);
  // Фейковая цена
  setTotalSumFake(0);

  const ids = Array.from(BasketData.keys()).join(",");
  // Асинхронная загрузка данных о продукте
  fetch(`/api/v1/products/by_ids/${ids}`)
    .then((response) => response.json())
    .then((products) => {
      setProducts(products); // Устанавливаем первый продукт или null
      setIsLoading(false);
      products.forEach((element: Products) => {
        const count = BasketData.get(element.id);
        const price = Number(element.price?.[city]);
        const priceFake =
          element.old_price_p?.[city] || element.old_price_c?.[city];
        console.log(priceFake);
        if (count) {
          TotalSumBasket += price * count;
          if (priceFake) {
            TotalSumBasketFake += priceFake * count;
          } else {
            TotalSumBasketFake += price * count;
          }
        }
      });
      // Cуществует ли скидка ?
      // Если цена со скидкой меньше цены без скидки значит и скидки не было
      const isSale = TotalSumBasketFake > TotalSumBasket;
      if (isSale) {
        // Итог
        setTotalSum(TotalSumBasket);
        // Скидка
        setSale(Math.round(TotalSumBasketFake - TotalSumBasket));
        // Фейковая цена
        setTotalSumFake(TotalSumBasketFake);
      } else {
        // Итог
        setTotalSum(TotalSumBasket);
        // Скидка
        setSale(0);
        // Фейковая цена
        setTotalSumFake(TotalSumBasket);
      }
    })
    .catch(() => setIsLoading(false)); // Обработка ошибок
    
  }, [BasketData]);

  // Пока идет загрузка, возвращаем null или индикатор загрузки
  if (isLoading) return <Text>Загрузка...</Text>;

  if (products.length === 0) return <Text>Продукт не найден</Text>;

  const itemsCart: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <BasketBody
          city={city}
          products={products}
          BasketData={BasketData}
          totalSum={totalSum}
          totalSumFake={totalSumFake}
          sale={sale}
        />
      ),
    },
  ];

  const badgeCount = Array.from(BasketData.values()).reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  return (
    <Suspense>
      <Dropdown
        // open={true}
        menu={{ items: itemsCart }}
        trigger={["hover"]}
        placement="top"
      >
        <div className={styles.HeaderMenuLine1TabsСartContainer}>
          <div className={styles.HeaderMenuLine1TabsСartContainerContent}>
            <Badge count={badgeCount}>
              <Image
                src="/cart.svg"
                alt="cart"
                width={48}
                height={48}
                style={isDarkThemeImage}
              />
            </Badge>
            <div className={styles.HeaderMenuLine1TabsСartContainerContentData}>
              <Text>Корзина</Text>
              <Text>{beautifulCost(totalSum)}</Text>
            </div>
          </div>
        </div>
      </Dropdown>
    </Suspense>
  );
}

function BasketBody({
  city,
  products,
  BasketData,
  totalSum,
  totalSumFake,
  sale,
}: {
  city: string;
  products: Products[];
  BasketData: Map<number, number>;
  totalSum: number;
  totalSumFake: number;
  sale: number;
}) {
  const { addProduct, removeProduct } = useBasketStore((state) => ({
    addProduct: state.addProduct,
    removeProduct: state.removeProduct,
  }));

  return (
    <div
      style={{
        backgroundColor: "mintcream",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "320px",
      }}
    >
      <Flex
        vertical={true}
        gap={15}
        justify="space-between"
        align="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Flex
          vertical={true}
          justify="flex-start"
          align="baseline"
          style={{
            boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
            padding: "10px",
            width: "100%",
          }}
        >
          <Title level={5}>Корзина</Title>
        </Flex>
        <div
          className={styles.Scroll}
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          {products.length > 0 &&
            products.map((item) => {
              const count = BasketData.get(item.id);
              return (
                <>
                  {count && (
                    <ItemInBasket
                      product={item}
                      city={city}
                      count={count}
                      add={() => addProduct(item.id, 1)}
                      dec={() => removeProduct(item.id, 1)}
                    />
                  )}
                </>
              );
            })}
        </div>
        <Flex
          vertical={true}
          justify="center"
          style={{
            width: "100%",
            padding: 10,
            marginTop: "10px",
            boxShadow: "0px -10px 8px 0px rgba(34, 60, 80, 0.2)",
          }}
        >
          <Flex
            justify="space-between"
            align="baseline"
            style={{ width: "100%" }}
          >
            <Text>Товаров на сумму:</Text>
            <Text strong>{beautifulCost(totalSumFake)}</Text>
          </Flex>
          <Flex
            justify="space-between"
            align="baseline"
            style={{ width: "100%" }}
          >
            <Text>Скидка:</Text>
            <Text strong>{beautifulCost(sale)}</Text>
          </Flex>
          <Flex
            justify="space-between"
            align="baseline"
            style={{ width: "100%" }}
          >
            <Title level={5}>Итог:</Title>
            <Text strong>{beautifulCost(totalSum)}</Text>
          </Flex>
          <Flex justify="space-around" style={{ width: "100%" }}>
            <Button
              size="large"
              style={{
                color: "white",
                background:
                  "radial-gradient(at right center, #692763, #2A8CDD)",
              }}
            >
              В корзину
            </Button>
            <Button
              size="large"
              style={{
                color: "black",
                background:
                  "linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)",
              }}
            >
              Оформить
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

// Компонент для отображения товара в корзине
const ItemInBasket = ({
  product,
  city,
  count,
  add,
  dec,
}: {
  product: Products;
  count: number;
  city: string;
  add: () => void;
  dec: () => void;
}) => {
  const localActive = useLocale();
  const isHaveInCurrentCity = !product?.price?.[city];

  const price = product?.price?.[city] || "Цена не указана";
  const old_price_product = product?.old_price_p?.[city];
  const old_price_category = product?.old_price_c?.[city];
  const old_price = old_price_product || old_price_category;

  return (
    <Flex
      justify="space-around"
      align="center"
      style={{
        marginBottom: 5,
      }}
    >
      <Flex
        justify="center"
        align="center"
        style={{
          width: "20%",
        }}
      >
        <Image
          src={product.list_url_to_image[0]}
          width={64}
          height={64}
          style={{ objectFit: "contain" }}
          alt={product.name_product}
        />
      </Flex>
      <Flex
        vertical={true}
        style={{
          width: "55%",
        }}
      >
        <Title level={5}>
          {ucFirst(selectDataByLangProducts(product, localActive))}
        </Title>
        <Flex gap={"25px"} justify="flex-start" style={{ width: "100%" }}>
          <Text strong>{beautifulCost(price)}</Text>
          <Text type="secondary" delete>
            {old_price && beautifulCost(old_price)}
          </Text>
        </Flex>
        {isHaveInCurrentCity && (
          <Text color="red">Товара нет в текущем городе</Text>
        )}
      </Flex>
      <Flex
        gap={"3px"}
        style={{ width: "20%" }}
        vertical={true}
        justify="center"
        align="center"
      >
        <Button
          size={"small"}
          style={{
            color: "white",
            width: "50%",
            background: "radial-gradient(at center, #2B8101, #204901)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            add();
          }}
        >
          <b>+</b>
        </Button>
        <Text strong>{count}</Text>
        <Button
          size={"small"}
          style={{
            color: "white",
            width: "50%",
            background: "radial-gradient(at center, #810102, #490101)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            dec();
          }}
        >
          <b>-</b>
        </Button>
      </Flex>
    </Flex>
  );
};
