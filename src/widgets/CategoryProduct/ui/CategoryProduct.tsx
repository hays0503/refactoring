"use client";

import { Button, Divider, Dropdown, Flex, Space, Typography } from "antd";
import { ProductCartPreview } from "@/features/ProductCartPreview";
import Style from "./CategoryProduct.module.scss";
import { useLocale } from "next-intl";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { Category } from "@/shared/types/category";
import useCityStore from "@/_app/store/city";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Products } from "@/shared/types/products";
import useThemeStore from "@/_app/store/theme";

const { Title } = Typography;

const ChangeListViewDropdown = ({
  currentItem,
  items,
}: {
  currentItem: number;
  items: MenuProps["items"];
}) => {
  // На странице 10 , 20 , 30 товаров

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["0"],
      }}
    >
      <Typography.Link>
        <Space>
          <Typography.Text>{`На странице ${currentItem}`}</Typography.Text>
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

const SortListViewDropdown = ({
  currentItem,
  items,
}: {
  currentItem: string;
  items: any;
}) => {
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["0"],
      }}
    >
      <Typography.Link>
        <Space>
          <Typography.Text>{`${items?.find(
            (i: { key: string; }) => i.key === currentItem
          ).label}`}</Typography.Text>
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default function CategoryProduct({
  products,
  currentCategory,
  params,
}: {
  products: Products[];
  currentCategory: Category | null;
  params: any;
}) {
  const route = useRouter();

  const localActive = useLocale();

  const currentCity = useCityStore((store) => store.currentCity);

  const nameCategory = selectDataByLangCategory(currentCategory, localActive);

  const [isVertical, setVertical] = useState<boolean>(true);

  const itemsList = [
    {
      key: 0,
      label: "Показать 12 товаров",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/12/${params.sort}`
        ),
    },
    {
      key: 1,
      label: "Показать 15 товаров",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/15/${params.sort}`
        ),
    },
    {
      key: 2,
      label: "Показать 18 товаров",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/18/${params.sort}`
        ),
    },
  ];

  const itemSortList = [
    {
      key: "popular-first",
      label: "Сначало: более популярных",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/${params.limit}/popular-first`
        ),
    },
    {
      key: "unpopular-first",
      label: "Сначало: менее популярных",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/${params.limit}/unpopular-first`
        ),
    },
    {
      key: "expensive-first",
      label: "Сначало: более дорогие",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/${params.limit}/expensive-first`
        ),
    },
    {
      key: "cheaper-first",
      label: "Сначало: менее дорогие",
      onClick: () =>
        route.replace(
          `/${localActive}/products-in-category/${params.slug}/${params.page}/${params.limit}/cheaper-first`
        ),
    },
  ];

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const darkMode: CSSProperties = {
    backgroundColor: isDarkMode ? "rgb(94, 94, 94)" : "white",
  };

  if(products.length !== 0)
    console.log(products)

  return (
    <>
      {/* <div className={Style.MainContainer}> */}
      <div className={Style.Container} style={darkMode}>
        <Flex justify="space-between" style={{ width: "100%" }}>
          <div>
            <Title level={5}>{nameCategory}</Title>
          </div>
          <Flex justify="center" align="center" gap={"5px"}>
            <SortListViewDropdown
              currentItem={params.sort}
              items={itemSortList}
            />
            <ChangeListViewDropdown
              currentItem={params.limit <= 0 ? 12 : params.limit}
              items={itemsList}
            />
            <Button id={Style.desktop} onClick={() => setVertical(false)}>
              <Image
                src="/HorizontalList.svg"
                width={24}
                height={24}
                alt="HorizontalList"
              />
            </Button>
            <Button id={Style.desktop} onClick={() => setVertical(true)}>
              <Image
                src="/VerticalList.svg"
                width={24}
                height={24}
                alt="VerticalList"
              />
            </Button>
          </Flex>
        </Flex>

        <Divider orientation="center" type="horizontal" />
        {/* ///////////////////////////////// */}
        <div
          className={
            isVertical
              ? Style.GridContainerVertical
              : Style.GridContainerHorizontal
          }
        >
          {/* Если продуктов нет то пишем товар закончился */}
          {products && products.length === 0 && <div>Товар закончился</div>}
          {products?.map((product, index) => {
            return (
              <ProductCartPreview
                key={index}
                product={product}
                city={currentCity}
                isVertical={isVertical}
              />
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
