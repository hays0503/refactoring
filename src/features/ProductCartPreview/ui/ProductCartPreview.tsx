"use client";

import {
  Card,
  Flex,
  Typography,
  Rate,
  Button,
  Badge,
  Tag,
  Popover,
  message,
  Avatar,
  Image as ImageAntd,
  Divider,
} from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  TagOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useLocale } from "next-intl";
import Image from "next/image";
import { CSSProperties, Key, Suspense, useEffect, useState } from "react";
import { Products, TagProd } from "@/shared/types/products";
import { selectDataByLangProducts } from "@/shared/tool/selectDataByLang";
import Link from "next/link";
import { ProductsDetail } from "@/shared/types/productsDetail";
import beautifulCost from "@/shared/tool/beautifulCost";
import style from "./ProductCartPreview.module.scss";
import useBasketStore from "@/_app/store/basket";

const { Title, Text } = Typography;

type ReviewType = {
  id: number;
  user_id: number;
  review: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  product: number;
};

const ReviewsUser = ({ product }: { product: Products }) => {
  const [dataReviewsUser, setDataReviewsUser] = useState<ReviewType[]>([]);

  useEffect(() => {
    fetch("/api/v1/reviews")
      .then((res) => res.json())
      .then((rev) => {
        const buildRev = rev.map((item: { user_id: number }) => {
          return fetch(`/auth_api/v1/auth_user/${item.user_id}`)
            .then((res) => res.json())
            .then((data) => {
              return { ...item, user: data };
            });
        });
        Promise.all(buildRev).then((data) => {
          const flitredData = data.filter(
            (item: { product: number }) => item.product === product.id
          );
          setDataReviewsUser(flitredData);
        });
      });
  }, [product.id]);

  return (
    <Popover
      title={"Отзывы пользователей"}
      // trigger={'click'}
      content={
        <Flex
          gap={"10px"}
          vertical={true}
          style={{ width: "500px", height: "200px", overflowY: "scroll" }}
        >
          {dataReviewsUser.map(
            (rev: ReviewType, index: Key | null | undefined) => {
              return (
                <div key={index}>
                  <Flex gap={20} align="center">
                    <Flex gap={10} align="center" style={{ minWidth: "30%" }}>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text>{rev.user.username}</Text>
                    </Flex>
                    <Flex
                      gap={10}
                      justify={"flex-start"}
                      align="flex-start"
                      vertical={true}
                    >
                      <Text>{rev.review}</Text>
                      {/* <Flex gap={5} style={{ width: '300px', height: '90px', overflowX: 'scroll' }} >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                      (i, index) => { return <ImageAntd key={index} src={product.list_url_to_image[0]} style={{ minWidth: 64 }} /> }
                    )}
                  </Flex> */}
                    </Flex>
                  </Flex>
                  <Divider />
                </div>
              );
            }
          )}
        </Flex>
      }
    >
      <Flex gap={"5px"}>
        <Image
          src={"/chat-bubbles.svg"}
          width={16}
          height={16}
          alt="comments number"
        />
        <Text>{dataReviewsUser.length}</Text>
      </Flex>
    </Popover>
  );
};

const Description = ({
  product,
  city,
  localActive,
  urlCity,
}: {
  product: Products;
  city: string;
  localActive: string;
  urlCity: string;
}) => {
  // Цена устанавливается исходя из города пользователя
  const price = product?.price?.[city] || "Цена не указана";
  const old_price_product = product?.old_price_p?.[city];
  const old_price_category = product?.old_price_c?.[city];
  const old_price = old_price_product || old_price_category;

  const BasketStore = useBasketStore((state) => state);

  return (
    <>
      <Flex vertical={true} gap={"10px"}>
        <Link href={`/${localActive}/${urlCity}/products/${product.slug}`}>
          <Flex gap={"5px"}>
            {" "}
            <Text strong>{beautifulCost(price)}</Text>{" "}
            <Text type="secondary" delete>
              {old_price && beautifulCost(old_price)}
            </Text>
          </Flex>
          <Flex gap={"25px"}>
            <Rate
              disabled
              allowHalf
              defaultValue={
                product?.average_rating ? product?.average_rating : 0
              }
              onChange={() => {
                message.success({
                  content: (
                    <Flex gap={"5px"}>
                      <Text>{`Спасибо за вашу оценку !`}</Text>
                      <SmileOutlined style={{ color: "green" }} />{" "}
                    </Flex>
                  ),
                });
              }}
            />

            {/* <ReviewsUser product={product} /> */}
          </Flex>
        </Link>
        <Popover
          zIndex={2000}
          placement="topLeft"
          content={
            <Flex gap={"10px"} vertical={true}>
              <Button icon={<ShoppingOutlined />}>Купить сейчас</Button>
              <Button
                icon={<TagOutlined />}
                onClick={() => {
                  message.success({
                    content: (
                      <Flex gap={"5px"}>
                        <Text>{`Товар успешно отложен в корзину !`}</Text>
                        <SmileOutlined style={{ color: "green" }} />{" "}
                      </Flex>
                    ),
                  });
                  BasketStore.addProduct(
                    product.id,
                    1,
                    product.price?.[city] ? product.price?.[city] : -1,
                    city
                  );
                }}
              >
                Отложить товар
              </Button>
            </Flex>
          }
        >
          <Button type="primary" style={{ width: "90px", zIndex: 1000 }}>
            Купить
          </Button>
        </Popover>
      </Flex>
    </>
  );
};

const InstallTag = ({
  TagProd,
  index,
  children,
}: {
  TagProd: TagProd;
  index: number;
  children: any;
}) => {
  return (
    <Badge.Ribbon
      text={TagProd.tag_text}
      style={{
        top: `${index * 40}px`,
        color: TagProd.font_color,
        backgroundColor: TagProd.fill_color,
      }}
      placement="start"
    >
      {children}
    </Badge.Ribbon>
  );
};

const BuildAllTag = ({
  TagsProd,
  children,
}: {
  TagsProd: TagProd[];
  children: any;
}) => {
  let Content = children;

  TagsProd.forEach((tag, index) => {
    Content = (
      <InstallTag TagProd={tag} index={index}>
        {Content}
      </InstallTag>
    );
  });
  return <>{Content}</>;
};

export default function ProductCartPreview({
  product,
  city,
  urlCity,
  isVertical = false,
}: {
  product: Products;
  city: string;
  urlCity: string;
  isVertical: boolean;
}) {
  //Выбранный язык пользователя
  const localActive = useLocale();

  if (!product) return null;

  if (!city) return null;

  if (!product.price) return null;

  if (product.price[city] === undefined) return null;

  // Название товара
  const NameProduct: string =
    selectDataByLangProducts(product, localActive) || "Название не установлено";

  // Тэги товара
  const TagProduct: TagProd[] = product?.tag_prod
    ? product.tag_prod
    : [
        {
          id: 0,
          additional_data: { EN: "", KZ: "" },
          tag_text: "Тэг не установлен 1",
          font_color: "#000",
          fill_color: "",
        },
      ];

  const discount_amount_product = product?.discount_amount_p;
  const discount_amount_category = product?.discount_amount_c;
  const discount = discount_amount_product || discount_amount_category;

  const TagProductSale: TagProd = {
    id: 0,
    additional_data: { EN: "", KZ: "" },
    tag_text: `Скидка ${discount}%`,
    font_color: "#000",
    fill_color: "#FF0000",
  };

  const cardStyle = isVertical
    ? style.StyleCardVertical
    : style.StyleCardHorizontal;

  const Body = () => {
    return (
      <Card
        hoverable
        className={cardStyle}
        cover={
          <Link href={`/${localActive}/${urlCity}/products/${product.slug}`}>
            <Flex justify="center">
              <Image
                priority={true}
                alt="example"
                src={product.list_url_to_image[0]}
                width={150}
                height={150}
                style={{ objectFit: "contain", padding: "10px" }}
              />
            </Flex>
          </Link>
        }
      >
        <Card.Meta
          title={
            <Link href={`/${localActive}/${urlCity}/products/${product.slug}`}>
              {NameProduct}
            </Link>
          }
          description={
            <Description
              product={product}
              city={city}
              localActive={localActive}
              urlCity={urlCity}
            />
          }
        />
      </Card>
    );
  };

  return (
    <div style={{ padding: "10px" }}>
      <BuildAllTag TagsProd={TagProduct}>
        {discount ? (
          <InstallTag TagProd={TagProductSale} index={3}>
            <Body />
          </InstallTag>
        ) : (
          <Body />
        )}
      </BuildAllTag>
    </div>
  );
}
