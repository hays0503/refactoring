import beautifulCost from "@/shared/tool/beautifulCost";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";
import ucFirst from "@/shared/tool/ucFirst";
import { Products } from "@/shared/types/products";
import { Button, Flex, Typography } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const { Text, Title } = Typography;

// Компонент для отображения товара в корзине
const ItemInBasket: React.FC<{
  product: Products;
  count: number;
  city: string;
  add: () => void;
  dec: () => void;
}> = ({ product, city, count, add, dec }) => {
  const localActive = useLocale();
  const isHaveInCurrentCity = !product?.price?.[city];
  const price = product?.price?.[city] || "Цена не указана";
  const oldPrice = product?.old_price_p?.[city] || product?.old_price_c?.[city];

  return (
    <Flex
      justify="space-around"
      align="center"
      style={styles.container}
      gap={10}
    >
      <Flex justify="center" align="center" vertical style={styles.imageContainer}>
        <div style={{
          width:72,
          height:72,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          src={product.list_url_to_image[0] || "/placeholder.png"}
          alt={product.name_product || "Нет названия"}
          style={{
            height: "100%",
            width: "auto",
          }}
        />
        </div>
        <Flex 
        gap="3px"
        style={styles.actionsContainer}
        justify="center"
        align="center"
      >
        <Button
          size="small"
          style={styles.incrementButton}
          onClick={(e) => {
            e.stopPropagation();
            add();
          }}
        >
          <b>+</b>
        </Button>
        <Text strong>{count}</Text>
        <Button
          size="small"
          style={styles.decrementButton}
          onClick={(e) => {
            e.stopPropagation();
            dec();
          }}
        >
          <b>-</b>
        </Button>
      </Flex> </Flex>
      <Flex vertical style={styles.detailsContainer}>
        <Text ellipsis={{ 
          tooltip: selectDataByLangProducts(product, localActive)
        }}> {ucFirst(selectDataByLangProducts(product, localActive))}
        </Text>
        <Flex gap="25px" justify="flex-start" style={{ width: "100%" }}>
          <Text strong>{beautifulCost(price)}</Text>
          {oldPrice && (
            <Text type="secondary" delete>
              {beautifulCost(oldPrice)}
            </Text>
          )}
        </Flex>
        {isHaveInCurrentCity && (
          <Text type="danger">Товара нет в текущем городе</Text>
        )}
        <Text type="secondary">Заказ со склада в городе</Text>
        <Text type="secondary">{ucFirst(city)}</Text>
 </Flex>


      
    </Flex>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: 5,
  },
  imageContainer: {
    width: "20%",
  },
  image: {
    objectFit: "contain",
  },
  detailsContainer: {
    width: "55%",
  },
  actionsContainer: {
    minWidth: "100%",
  },
  incrementButton: {
    color: "white",
    maxWidth: "50px",
    background: "radial-gradient(at center, #2B8101, #204901)",
  },
  decrementButton: {
    color: "white",
    maxWidth: "50px",
    paddingLeft: "8px",
    paddingRight: "8px",
    background: "radial-gradient(at center, #810102, #490101)",
  },
};

export default React.memo(ItemInBasket);
