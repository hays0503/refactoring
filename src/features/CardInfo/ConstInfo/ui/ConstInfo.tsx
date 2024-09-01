import style from "./ConstInfo.module.scss";
import { Button, Flex, Popover, Typography, Tag } from "antd";
import { InfoCircleTwoTone, StarFilled, LikeTwoTone } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { Products } from "@/shared/types/products";
import useCityStore from "@/_app/store/city";
import { ProductsDetail } from "@/shared/types/productsDetail";
import beautifulCost from "@/shared/tool/beautifulCost";
import { useEffect, useState } from "react";
import { Reviews } from "@/shared/types/reviews";
import scrolltoHash from "@/shared/tool/scrolltoHash";
import { Discount } from "@/entities/Discount";
import useBasketStore from "@/_app/store/basket";
import { KaspiCredit } from "@/entities/Credit";
import { revalidateConfig } from "@/shared/config/revalidateConfig";
import { shallow } from "zustand/shallow";

const { Text, Link } = Typography;

const Articul = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  return (
    <Text type="secondary">
      {t("artikul")} {product?.id}
    </Text>
  );
};

const RatingSmall = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  const [reviews, setReviews] = useState<Reviews[]>([]);
  useEffect(() => {
    fetch(`/api/v1/reviews/filter_by_prod/${product?.id}`, {
      next: revalidateConfig["/api/v1/reviews/filter_by_prod"],
    })
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [product?.id]);

  return (
    <div
      className={style.ConstLineSpaceBetween}
      onClick={() => scrolltoHash("Review")}
    >
      <Text>
        <StarFilled style={{ color: "gold" }} />
        {product?.average_rating}
      </Text>
      <Link style={{color:'black'}}>
        ({t("otzyvov")} {reviews.length} )
      </Link>
      {/* <div onClick={()=>scrolltoHash('Review')}>({reviews.length} {t("otzyvov")})</div> */}
    </div>
  );
};

const Bonus = () => {
  {
    /* Бонусы */
  }
  const t = useTranslations();
  return (
    <div className={style.Bonus}>
      <Link>до 100</Link>
      <Text>{t("bonusov")}</Text>
      <Popover
        content={
          <div>
            <Text>{t("akciya-takaya-to-i-uslovie-takie-to")}</Text>
          </div>
        }
        title={t("opisanie-akcii-i-bonusov")}
      >
        <InfoCircleTwoTone />
      </Popover>
    </div>
  );
};

const Credit = () => {
  const t = useTranslations();
  return (
    <div className={style.Credit}>
      <div className={style.CreditLine}>
        <Text>{t("v-kredit")} </Text>
        <Text strong>{`${Number(11111)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}  ₸ x ${60} мес`}</Text>
      </div>
      <div className={style.CreditLine}>
        <Text>{t("v-rassrochku")} </Text>
        <Text strong>{`${Number(1111111)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}  ₸ x ${60} мес`}</Text>
      </div>
    </div>
  );
};

const ConstInfo = ({
  product,
  currentCity,
}: {
  product: ProductsDetail | null;
  currentCity: string;
}) => {
  // const City = useCityStore((state) => state.currentCity);

  const [addProduct, BasketData] = useBasketStore((store) => [store.addProduct, store.BasketData],shallow);

  const currentGiftSelect = BasketData.get(product?.id!)?.gift_prod_id;

  const t = useTranslations();

  return (
    <div className={style.CostContainer}>
      {/* Артикул и рейтинг */}
      <div className={style.ConstLineSpaceBetween}>
        <Articul product={product} />
        <RatingSmall product={product} />
      </div>

      <Discount product={product} City={currentCity} />

      {/* <Bonus /> */}

      {/* В кредит / В рассрочку*/}
      {/* <Credit /> */}

      {/* Кнопка купить */}
      {product?.id && (
        <Button
          onClick={() =>
            addProduct(
              product.id,
              currentGiftSelect ? currentGiftSelect : -1,
              1,
              product.price?.[currentCity] ? product.price?.[currentCity] : -1,
              currentCity
            )
          }
          className={style.CostBuy}
        >
          {t("dobavit-v-korzinu")}
        </Button>
      )}
      <KaspiCredit product={product} currentCity={currentCity}/>
    </div>
  );
};

export default ConstInfo;
