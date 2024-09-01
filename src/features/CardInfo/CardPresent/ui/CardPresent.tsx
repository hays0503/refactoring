import style from "./CardPresent.module.scss";
import { Tooltip, Typography, Radio, Button, Flex } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Products } from "@/shared/types/products";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";
import useBasketStore from "@/_app/store/basket";
import { FrownTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Text, Title } = Typography;

const Build = (present: Products[], localActive: string) => {
  return present.map((item: Products, index: number) => {
    return {
      value: item.id,
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

const CardPresent = ({
  product,
  currentCity,
}: {
  product: ProductsDetail | null;
  currentCity: string;
}) => {
  const t = useTranslations();
  const localActive = useLocale();

  const [selectPresent, setSelectPresent] = useState<number>(0);

  const { addProduct, BasketData, removeGiftProduct } = useBasketStore((state) => ({
    addProduct: state.addProduct,
    BasketData: state.BasketData,
    removeGiftProduct: state.removeGiftProduct
  }));

  const giftProductId = product?.id ? BasketData.get(product.id)?.gift_prod_id : -1;

  useEffect(() => {
    setSelectPresent(giftProductId ?? -1);
  }, [giftProductId, product?.id]);

  return (
    <>
      <div className={style.Container}>
        <div className={style.Params}>
          <div className={style.ColorHeader}>
            <Text strong>{t("vyberite-podarok")}</Text>
          </div>
          <div className={style.ItemContainer}>
            <ul className={style.ListUl}>
              {product?.present && (
                <Radio.Group
                  value={selectPresent}
                  onChange={(e) => {
                    const gift_id: number = e.target.value;
                    addProduct(
                      product.id,
                      gift_id,
                      0,
                      product?.price?.[currentCity] ?? 0,
                      currentCity
                    );
                  }}
                  options={Build(product.present, localActive)}
                />
              )}
            </ul>
            { (giftProductId != undefined && giftProductId !== -1) && (
              <Flex vertical>
                <Text>
                  {`${t("v-podarok")}:  ${
                    product?.present.find(
                      (item) =>
                        item.id === giftProductId
                    )?.name_product
                  }`}
                </Text>
                <Button 
                  icon={<FrownTwoTone />}
                  onClick={() => {
                    removeGiftProduct(product?.id ?? -1);
                    addProduct(
                      product?.id ?? -1,
                      null,
                      0,
                      product?.price?.[currentCity] ?? 0,
                      currentCity
                    );
                    setSelectPresent(-1);
                  }}
                >
                    Мне не нужен подарок
                </Button>
              </Flex>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// const CardPresent = ({
//   product,
//   currentCity,
// }: {
//   product: ProductsDetail | null;
//   currentCity: string;
// }) => {
//   const t = useTranslations();
//   const localActive = useLocale();

//   const [selectPresent, setSelectPresent] = useState<number>(0);

//   const { addProduct, BasketData,removeGiftProduct } = useBasketStore((state) => ({
//     addProduct: state.addProduct,
//     BasketData: state.BasketData,
//     removeGiftProduct: state.removeGiftProduct
//   }));

//   useEffect(() => {
//     setSelectPresent(BasketData.get(product?.id ?? 0)?.gift_prod_id ?? -1);
//   },[BasketData.get(product?.id ?? 0)?.gift_prod_id,selectPresent,product?.id]);

//   return (
//     <>
//       <div className={style.Container}>
//         <div className={style.Params}>
//           <div className={style.ColorHeader}>
//             <Text strong>{t("vyberite-podarok")}</Text>
//           </div>
//           <div className={style.ItemContainer}>
//             <ul className={style.ListUl}>
//               {product?.present && (
//                 <Radio.Group
//                   value={selectPresent}
//                   onChange={(e) => {
//                     const gift_id: number = e.target.value;
//                     addProduct(
//                       product.id,
//                       gift_id,
//                       0,
//                       product?.price?.[currentCity] ?? 0,
//                       currentCity
//                     );
//                   }}
//                   options={Build(product.present, localActive)}
//                 />
//               )}
//             </ul>
//             {BasketData.get(product?.id ?? 0)?.gift_prod_id && (
//               <Flex vertical>
//                 <Text>
//                   {`${t("v-podarok")}:  ${
//                     product?.present.find(
//                       (item) =>
//                         item.id === BasketData.get(product.id)?.gift_prod_id
//                     )?.name_product
//                   }`}
//                 </Text>
//                 <Button 
//                   icon={<FrownTwoTone />}
//                   onClick={() => {
//                     removeGiftProduct(product?.id ?? -1);
//                     addProduct(
//                       product?.id ?? -1,
//                       null,
//                       0,
//                       product?.price?.[currentCity] ?? 0,
//                       currentCity
//                     );
//                     setSelectPresent(-1);
//                   }}
//                 >
//                     Мне не нужен подарок
//                 </Button>
//               </Flex>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default CardPresent;
