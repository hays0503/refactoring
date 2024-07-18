import { Divider, Image, Typography, Collapse, Rate, Flex } from "antd";
import style from "./Rating.module.scss";
import { useTranslations } from "next-intl";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Text, Link, Title } = Typography;

export default function Rating({rating}:{rating:number}) {
  const t = useTranslations();
  return (
    <div className={style.RatingContainerContent}>
      {/* Рейтинг */}
      <div className={style.RatingContainerColumn}>
        <Flex align="baseline" gap={10}>
          <Title level={5}>{t("reiting")}</Title>
          <Rate disabled allowHalf defaultValue={rating} />
          <Title level={5}>{rating}</Title>
          {/* Рекомендиции */}
          {/* 
          <div className={style.RatingRecomender}>
          <CheckCircleOutlined style={{ color: "green", padding: "5px" }} />
            <div className={style.RatingRecomenderText}>
              <Text>93% {t("polzovatelei-rekomenduyut-etot-produkt")}</Text>
            </div>
          </div> 
          */}

          {/* <div className={style.RatingValue}> */}
          {/* </div> */}
        </Flex>
      </div>
      <Divider />
    </div>
  );
}
