import style from "./CardParameters.module.scss";
import { Tooltip, Typography } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Specification } from "@/shared/types/specification";
import { useEffect, useState } from "react";
import { Products } from "@/shared/types/products";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";

const { Text, Title } = Typography;

// const fetchSpecifications = async (productId: number) => {
//   const response = await fetch(`/api/v1/specif/filter_by_prod/${productId}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch specification');
//   }
//   const data = await response.json();
//   return data;
// }

const fetchProductById = async (productIds: number[]) => {
  const response = await fetch(`/api/v1/products/by_ids${productIds}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};

const CardParameters = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  const localActive = useLocale();

  return (
    <>
      <div className={style.Container}>
        <div className={style.Blur} />
        <div className={style.Params}>
          <div className={style.ColorHeader}>
            <Text strong>{t("varianty-ispolneniya-komplektacii")}</Text>
          </div>
          <div className={style.ColorImageContainer}>
            <ul className={style.ListUl}>
              {product?.configuration.map((item: Products, index: number) => (
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
              ))}
            </ul>
          </div>
          {/* <div className={style.ColorImageContainer}>
          <div className={style.ColorImage}>
            <Image src='/cat404.svg' alt='cat404' width={64} height={64}/>
          </div>
          <div className={style.ColorImage}>
            <Image src='/cat404.svg' alt='cat404' width={64} height={64}/>
          </div>
        </div> */}

          {/* Параметры товара
        <Title level={5}>{t('parametry-tovara')}</Title>
        <div className={style.Param}>
          {
            ['65" (165 см)', '65" (165 см)', '65" (165 см)', '65" (165 см)'].map((item, index) =>
              <Button key={index} size='small' shape="round" className={style.ParamButton}>
                {item}
              </Button>
            )}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default CardParameters;
