import style from "./CardPresent.module.scss";
import { Tooltip, Typography, Radio } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Products } from "@/shared/types/products";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";

const { Text, Title } = Typography;

const Build = (present: Products[], localActive: string) => {
  return present.map((item: Products, index: number) => {
    return {
      value: item.slug,
      label: (
        <li key={index} className={style.Item}>
          <Tooltip
            placement="bottomLeft"
            title={selectDataByLangProducts(item, localActive)}
            arrow={true}
          >
            <a href={`/${localActive}/products/${item.slug}`}>
              <Image
                className={style.ColorImage}
                src={item.list_url_to_image[0]}
                alt={item.name_product}
                width={54}
                height={54}
              />
            </a>
          </Tooltip>
        </li>
      ),
    };
  });
};

const CardPresent = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  const localActive = useLocale();

  return (
    <>
      <div className={style.Container}>
        <div className={style.Blur} />
        <div className={style.Params}>
          <div className={style.ColorHeader}>
            <Text strong>{t("v-podarok")}</Text>
          </div>
          <div className={style.ItemContainer}>
            <ul className={style.ListUl}>
              {product?.present && (
                <Radio.Group 
                 options={Build(product.present, localActive)} 
                 />
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPresent;
