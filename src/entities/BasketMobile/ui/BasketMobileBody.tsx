import useBasketStore from "@/_app/store/basket";
import useOrderStore from "@/_app/store/order";
import iBasket from "@/shared/types/basket";
import { Products } from "@/shared/types/products";
import { Button, Flex, Typography } from "antd";
import ItemInBasket from "./ItemInBasket";
import styles from "./Basket.module.scss";
import beautifulCost from "@/shared/tool/beautifulCost";
import React, { useEffect, useState } from "react";
import useTheme from "@/shared/hook/useTheme";
import { OrderInBasket } from "./OrderInBasket";

const { Text, Title } = Typography;

export const BasketBody: React.FC<{
  city: string;
  products: Products[];
  BasketData: Map<number, iBasket>;
  totalSum: number;
  totalSumFake: number;
  sale: number;
}> = React.memo(function BasketBody({
  city,
  products,
  BasketData,
  totalSum,
  totalSumFake,
  sale,
}) {
  const { addProduct, removeProduct } = useBasketStore((state) => ({
    addProduct: state.addProduct,
    removeProduct: state.removeProduct,
  }));

  const { toggleModal } = useOrderStore((state) => ({
    toggleModal: state.toggleModal,
  }));

  const renderProducts = () =>
    products.map((item) => {
      const count = BasketData.get(item.id)?.count;
      const cityInBasket = BasketData.get(item.id)?.city;
      if (cityInBasket) {
        const price = item.price?.[cityInBasket] || -1;

        if (!count) return null;

        return (
          <ItemInBasket
            key={item.id}
            product={item}
            city={cityInBasket}
            count={count}
            add={() => addProduct(item.id, null, 1, price, cityInBasket)}
            dec={() => removeProduct(item.id, null, 1, price, cityInBasket)}
          />
        );
      }
    });

  return (
    <Flex
      vertical
      gap={15}
      justify="space-between"
      align="center"
      className={styles.basketContent}
    >
      <Flex
        vertical
        justify="flex-start"
        align="baseline"
        className={styles.basketHeader}
      >
        <Title level={5}>Корзина</Title>
      </Flex>
      <div style={{ width: "100%" }}>
        {products.length > 0 && renderProducts()}
      </div>
      <Flex vertical justify="center" className={styles.basketFooter}>
        <SummaryRow
          label="Товаров на сумму:"
          value={beautifulCost(totalSumFake)}
        />
        <SummaryRow label="Скидка:" value={beautifulCost(sale)} />
        <SummaryRow label="Итог:" value={beautifulCost(totalSum)} isTitle />
          <Flex justify="space-around" gap={10} style={{ width: "100%" }}>

            <ActionButton
              label="Оформить"
              styleType="secondary"
              onClick={toggleModal}
            />
          </Flex>

      </Flex>
    </Flex>
  );
});

const SummaryRow: React.FC<{
  label: string;
  value: string | undefined;
  isTitle?: boolean;
}> = ({ label, value, isTitle }) => (
  <Flex justify="space-between" align="baseline" style={{ width: "100%" }}>
    <Text>{label}</Text>
    {isTitle ? (
      <Title level={5}>{value ?? "—"}</Title>
    ) : (
      <Text strong>{value ?? "—"}</Text>
    )}
  </Flex>
);

const ActionButton: React.FC<{
  label: string;
  styleType: "primary" | "secondary";
  onClick?: () => void;
}> = ({ label, styleType, onClick }) => {
  const styles = {
    primary: {
      color: "white",
      background: "radial-gradient(at right center, #692763, #2A8CDD)",
    },
    secondary: {
      color: "black",
      background:
        "linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)",
    },
  };

  return (
    <Button size="large" style={styles[styleType]} onClick={onClick}>
      {label}
    </Button>
  );
};

export const BasketMobileBody = ({ city }: { city: string }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalSumFake, setTotalSumFake] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const { isDarkThemeImage } = useTheme();

  const { BasketData, updateProduct } = useBasketStore((state) => ({
    BasketData: state.BasketData,
    updateProduct: state.updateProduct,
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
          const count = BasketData.get(element.id)?.count;
          const cityInBasket = BasketData.get(element.id)?.city;
          if (cityInBasket) {
            const price = Number(element.price?.[cityInBasket]);
            const priceInBasket = BasketData.get(element.id)?.price || 0;
            const priceFake =
              element.old_price_p?.[cityInBasket] ||
              element.old_price_c?.[city];
            if (count) {
              TotalSumBasket += price * count;
              if (priceFake) {
                TotalSumBasketFake += priceFake * count;
              } else {
                TotalSumBasketFake += price * count;
              }
            }
            if (priceInBasket != price) {
              let item = BasketData.get(element.id);
              if (item) {
                item.price = price;
                updateProduct(
                  item.prod_id,
                  item.gift_prod_id,
                  item.count,
                  price,
                  cityInBasket
                );
              }
            }
          }
        });
        // Существует ли скидка ?
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
  }, [BasketData, city, products.length]);

  // Пока идет загрузка, возвращаем null или индикатор загрузки
  if (isLoading) return <Text>Загрузка...</Text>;

  if (products.length === 0) return <Text>Продукт не найден</Text>;

  return (
    <div style={{height:"90dvh",width:"320px"}}>
      <BasketBody
        city={city}
        products={products}
        BasketData={BasketData}
        totalSum={totalSum}
        totalSumFake={totalSumFake}
        sale={sale}
        hideButton={false}
      />
    </div>
  );
};
