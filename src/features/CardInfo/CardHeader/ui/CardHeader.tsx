import style from "./CardHeader.module.scss";
import { Typography, Tag, Flex } from "antd";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { useTransition } from "react";
import { selectDataByTagProd } from "@/shared/tool/selectDataByLang";
import { useLocale } from "next-intl";

const { Text } = Typography;

const CardHeader = ({ product }: { product: ProductsDetail | null }) => {
  const localActive = useLocale();
  return (
    <div className={style.Header}>
      {/* Название */}
      <div>
        <Text strong style={{fontSize:'18px'}}>{product?.name_product}</Text>
      </div>
      {/* Тэги */}
      <div className={style.HeaderTag}>
        {/* <div className={style.Tag} style={{ backgroundColor: 'rgb(244, 128, 18)' }}>0-0-24</div>
      <div className={style.Tag} style={{ backgroundColor: 'rgb(115, 190, 111)' }}>-19%</div> */}
        <Flex gap="4px 0" wrap >
          {product?.tag_prod.map((tag) => (
            <Tag
              color={tag.fill_color}
              style={{
                color: `${
                  tag.fill_color !== tag.font_color ? tag.font_color : "while"
                }`,
                padding: "5px",
                fontSize:'14px',
                fontStyle:'oblique'
              }}
            >
              {selectDataByTagProd(tag, localActive)}
            </Tag>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default CardHeader;
