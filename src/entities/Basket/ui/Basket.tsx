"use client";

import {
  Dropdown,
  Badge,
  Typography,
} from "antd";
import Image from "next/image";
import styles from "./Basket.module.scss";
import useTheme from "@/shared/hook/useTheme";
import { Products } from "@/shared/types/products";
import beautifulCost from "@/shared/tool/beautifulCost";
import useBasketStore from "@/_app/store/basket";
import { Suspense, useEffect, useState } from "react";
const { Text } = Typography;
import type { MenuProps } from "antd";
import useOrderStore from "@/_app/store/order";
import { BasketBody } from "./BasketBody";
import { OrderInBasket } from "./OrderInBasket";


export default function Basket({ city }: { city: string }) {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalSumFake, setTotalSumFake] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const { isDarkThemeImage } = useTheme();

  const { BasketData,updateProduct } = useBasketStore((state) => ({
    BasketData: state.BasketData,
    updateProduct: state.updateProduct
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
          if(cityInBasket){
            const price = Number(element.price?.[cityInBasket]);
            const priceInBasket = BasketData.get(element.id)?.price || 0;
            const priceFake = element.old_price_p?.[cityInBasket] || element.old_price_c?.[city];
            if (count) {
              TotalSumBasket += price * count;
              if (priceFake) {
                TotalSumBasketFake += priceFake * count;
              } else {
                TotalSumBasketFake += price * count;
              }
            }
            if(priceInBasket!=price){
              let item = BasketData.get(element.id);
              if (item) {
                item.price = price;
                updateProduct(item.prod_id, item.count, price, cityInBasket);
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
  }, [BasketData, city,products.length]);

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
          hideButton={false}
        />
      ),
    },
  ];

  const badgeCount = Array.from(BasketData.values()).reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.count;
    },
    0
  );



  return (
    <>
      <Suspense>
        <Dropdown
          // open={true}
          menu={{ items: itemsCart }}
          trigger={["hover"]}
          placement="top"
        >
          <div className={styles.HeaderMenuLine1TabsCartContainer}>
            <div className={styles.HeaderMenuLine1TabsCartContainerContent}>
              <Badge count={badgeCount}>
                <Image
                  src="/cart.svg"
                  alt="cart"
                  width={48}
                  height={48}
                  style={isDarkThemeImage}
                />
              </Badge>
              <div
                className={styles.HeaderMenuLine1TabsCartContainerContentData}
              >
                <Text>Корзина</Text>
                <Text>{beautifulCost(totalSum)}</Text>
              </div>
            </div>
          </div>
        </Dropdown>
      </Suspense>
      <OrderInBasket city={city}>
        <BasketBody
            city={city}
            products={products}
            BasketData={BasketData}
            totalSum={totalSum}
            totalSumFake={totalSumFake}
            sale={sale}
            hideButton={true}
          />
      </OrderInBasket>
    </>
  );
}