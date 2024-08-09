import useBasketStore from "@/_app/store/basket";
import useOrderStore from "@/_app/store/order";
import iBasket from "@/shared/types/basket";
import { Products } from "@/shared/types/products";
import { Button, Flex, Typography } from "antd";
import ItemInBasket from "./ItemInBasket";
import styles from "./Basket.module.scss";
import beautifulCost from "@/shared/tool/beautifulCost";
import React from "react";

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
      if (cityInBasket){
        const price = item.price?.[cityInBasket] || -1;

        if (!count) return null;
  
        return (
          <ItemInBasket
            key={item.id}
            product={item}
            city={cityInBasket}
            count={count}
            add={() => addProduct(item.id, 1, price, cityInBasket)}
            dec={() => removeProduct(item.id, 1, price, cityInBasket)}
          />
        );
     }      
    });

  return (
    <div className={styles.basketContainer}>
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
        <div className={`${styles.scroll} ${styles.productList}`}>
          {products.length > 0 && renderProducts()}
        </div>
        <Flex
          vertical
          justify="center"
          className={styles.basketFooter}
        >
          <SummaryRow label="Товаров на сумму:" value={beautifulCost(totalSumFake)} />
          <SummaryRow label="Скидка:" value={beautifulCost(sale)} />
          <SummaryRow label="Итог:" value={beautifulCost(totalSum)} isTitle />
          <Flex justify="space-around" gap={10} style={{ width: "100%" }}>
            <ActionButton label="В корзину" styleType="primary" />
            <ActionButton label="Оформить" styleType="secondary" onClick={toggleModal} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
});

const SummaryRow: React.FC<{ label: string; value: string | undefined; isTitle?: boolean }> = ({ label, value, isTitle }) => (
    <Flex justify="space-between" align="baseline" style={{ width: "100%" }}>
      <Text>{label}</Text>
      {isTitle ? (
        <Title level={5}>{value ?? "—"}</Title>
      ) : (
        <Text strong>{value ?? "—"}</Text>
      )}
    </Flex>
  );
  

const ActionButton: React.FC<{ label: string; styleType: 'primary' | 'secondary'; onClick?: () => void }> = ({ label, styleType, onClick }) => {
  const styles = {
    primary: {
      color: "white",
      background: "radial-gradient(at right center, #692763, #2A8CDD)",
    },
    secondary: {
      color: "black",
      background: "linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)",
    },
  };

  return (
    <Button size="large" style={styles[styleType]} onClick={onClick}>
      {label}
    </Button>
  );
};
