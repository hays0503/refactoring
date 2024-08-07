import beautifulCost from "@/shared/tool/beautifulCost";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Flex, Tag, Typography } from "antd";
import { useTranslations } from "next-intl";
import style from "./Discount.module.scss";
import { LikeTwoTone } from "@ant-design/icons";

const { Text } = Typography;

const IfHaveDiscount = ({
  product,
  City,
}: {
  product: ProductsDetail | null;
  City: string;
}) => {
  const price = product?.price?.[City] || "Цена не указана";
  const old_price_product = product?.old_price_p?.[City];
  const old_price_category = product?.old_price_c?.[City];
  const old_price = old_price_product || old_price_category;
  const discount_amount_product = product?.discount_amount_p;
  const discount_amount_category = product?.discount_amount_c;
  const discount = discount_amount_product || discount_amount_category;
  const t = useTranslations();
  return (
    <Flex
      gap={10}
      vertical={true}
      justify="space-between"
      // style={{ width: "100%", height: "80px" }}
    >
      <div className={style.ConstLine}>
        {/* Цена */}
        <div className={style.Cost}>
          <Text strong>
            {t("cost")} {beautifulCost(price)}
          </Text>
        </div>

        {/* Цена без скидки */}
        {old_price && (
          <div className={style.Cost}>
            <Text disabled delete>
              {beautifulCost(old_price)}
            </Text>
          </div>
        )}
      </div>
      {old_price && (
        <Tag
          icon={<LikeTwoTone twoToneColor="#52c41a" />}
          // color="black"
          className={style.SaleAnimation}
        >
          Отличная цена, скидка {discount} %
        </Tag>
      )}
    </Flex>
  );
};

export default function Discount({
  product,
  City,
}: {
  product: ProductsDetail | null;
  City: string;
}) {
  return <IfHaveDiscount product={product} City={City} />;
}
