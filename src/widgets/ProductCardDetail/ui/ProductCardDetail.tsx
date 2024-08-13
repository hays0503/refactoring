import { Products } from "@/shared/types/products";
import { useTranslations } from "next-intl";
import style from "./ProductCardDetail.module.scss";
import { LikeTwoTone } from "@ant-design/icons";
import { Divider, Flex, Skeleton, Typography } from "antd";
import { AllBreadcrumb } from "@/features/CardInfo/AllBreadcrumb";
import { CardHeader } from "@/features/CardInfo/CardHeader";
import { CustomCarousel } from "@/features/CardInfo/CustomCarousel";
import { CardParameters } from "@/features/CardInfo/CardParameters";
import { ConstInfo } from "@/features/CardInfo/ConstInfo";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { ProductCartPreview } from "@/features/ProductCartPreview";
import { Description } from "@/features/CardInfo/Description";
import { Specifications } from "@/features/CardInfo/Specifications";
import CardPresent from "@/features/CardInfo/CardPresent/ui/CardPresent";

const { Title } = Typography


export default function ProductCardDetail({
  product,
  params,
  currentCity,
}: {
  product: ProductsDetail | null;
  params: any;
  currentCity: string;
}) {
  const t = useTranslations();

  // const currentCity = useCityStore((state) => state.currentCity);

  return (
    <div className={style.ConstainerComponentProductPage}>
      {/* <Breadcrumbs /> */}
      <div className={style.Container}>
        {/* Скелетон */}
        <Skeleton loading={!product}>
          <div className={style.ConstainerComponentProductPageMainContent}>
            {/* Контент карты товара */}
            <div className={style.Content}>
              <AllBreadcrumb product={product} />
              <Divider />
              {/* Заголовок */}
              <CardHeader product={product} />
              {/* Главный блок информации */}
              <div className={style.MainInfoBlock}>
                <div className={style.MainInfo}>
                  {/* Кастомная карусель */}
                  {product?.list_url_to_image && (
                    <CustomCarousel
                      images={
                        product.list_url_to_image.length > 0
                          ? product.list_url_to_image
                          : ["/cat404.svg"]
                      }
                    />
                  )}

                  {/* Параметры */}
                  {product?.configuration.length !== 0 && (
                    <CardParameters product={product} />
                  )}
                </div>

                {/* Описание цены*/}
                <div
                  className={
                    style.ConstainerComponentProductPageMainContentCostAndPresent
                  }
                >
                  <ConstInfo product={product} currentCity={currentCity} />
                  {product?.present.length !== 0 && (
                    <CardPresent product={product} currentCity={currentCity} />
                  )}
                </div>
              </div>

              {/* Описание товара */}
              <div className={style.Info}>
                <Flex vertical={true} style={{ width: "100%" }}>
                  {product && (
                    <Description productDescription={product?.description} />
                  )}
                  {product && <Specifications productId={product?.id} />}
                </Flex>
              </div>

              {/* Консультация */}
              {/* <Consultation />/ */}

              {/* Рейтинг и отзывы */}
              {/* <div className={style.RatingContainer}>
              <Collapse
                defaultActiveKey={"1"}
                items={[
                  {
                    key: "1",
                    label: t("reiting-i-otzyvy"),
                    children: (
                      <>
                        {product && <Rating rating={product.average_rating} />}
                        {product && <Review productId={product.id} />}
                      </>
                    ),
                  },
                ]}
                bordered={false}
              />
            </div> */}

              {/* Похожие товары */}
              {product?.related_product.length !== 0 && (
                <div className={style.SimilarProducts}>
                  <div className={style.SimilarProductsHeader}>
                    <Title level={5}>{t("s-etim-tovarom-pokupayut")}</Title>
                    <LikeTwoTone twoToneColor={"green"} />
                  </div>

                  <div className={style.SimilarProductsContainer}>
                    {product?.related_product?.map((item: Products, index) => {
                      return (
                        <div key={index}>
                          <ProductCartPreview
                            product={item}
                            urlCity={params.city}
                            city={currentCity}
                            isVertical={true}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
