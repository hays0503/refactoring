import { Avatar, Flex, Rate, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import style from "./Review.module.scss";
import { useEffect, useState } from "react";
import { Reviews } from "@/shared/types/reviews";
import { User } from "@/shared/types/user";

const { Title, Text } = Typography;

function ReviewItem({ item }: { item: Reviews }) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/auth_api/v1/auth_user/${item.user_id}`)
      .then((response) => response.json())
      .then((data: User) => setUserData(data));
  }, []);

  return (
    <div className={style.RatingContainerReview}>
      <div className={style.RatingContainerReviewHeader}>
        <Flex align="baseline" gap={"10px"}>
          <Rate disabled allowHalf defaultValue={item.rating} />
          <Title level={5}>{item.rating}</Title>
        </Flex>
        <Flex align="center" gap={"10px"}>
          <Avatar />
          <Text>{userData?.username}</Text>
        </Flex>
        {/* <Text type="secondary">{` ${4} ${t("dnya-nazad")}`}</Text> */}
      </div>
      <Text>{item.review}</Text>
    </div>
  );
}

export default function Review({ productId }: { productId: number }) {
  const t = useTranslations();
  const [ReviewData, setReviewData] = useState<Reviews[] | []>([]);

  useEffect(() => {
    fetch(`/api/v1/reviews/filter_by_prod/${productId}`)
      .then((response) => response.json())
      .then((data: Reviews[]) => setReviewData(data));
  }, []);

  /* Фото и видео отзывы */
  return (
    <div className={style.RatingContainerPhotoVideo}>
      <Flex gap={10} style={{ padding: "10px" }} align="baseline">
        <Title level={5}>{t("foto-i-video-otzyvy")}</Title>
        <Text strong type="success">{'[ '}{t("otzyvov")}</Text>
        <Text strong type="success">
          {ReviewData.length}{' ]'}
        </Text>
        
      </Flex>

      {ReviewData.map((item, index) => {
        return (
          <div key={index}>
            <ReviewItem item={item} />
          </div>
        );
      })}
    </div>
  );
}
