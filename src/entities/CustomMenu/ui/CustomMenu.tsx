"use client";

import { Category } from "@/shared/types/category";
import styles from "./CustomMenu.module.scss";
import { Button, Flex, Menu, Space, Typography } from "antd";
import Image from "next/image";
import { CSSProperties } from "react";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import { useLocale } from "next-intl";
import useTheme from "@/shared/hook/useTheme";
import useGetCategory from "@/shared/hook/useGetCategory";
import { useRouter } from "next/navigation";
import useCategoryStore from "@/_app/store/category";

const { Text } = Typography;

function TopMenu({
  CategoryRoot,
  isDarkTheme,
  isDarkThemeImage,
  localActive,
  setTab,
  setCategoryBanner,
}: {
  CategoryRoot: Category[];
  isDarkTheme: CSSProperties;
  isDarkThemeImage: CSSProperties;
  localActive: string;
  setTab: (Tab: Category[]) => void;
  setCategoryBanner: (categoryBanner: string[]) => void;
}) {
  return (
    <>
      <div id={styles.desktop} className={styles.HeaderMenuTop}>
        {CategoryRoot.map((CategoryItem, index) => (
          <Button
            key={CategoryItem.id}
            type="text"
            size="small"
            onClick={() => {
              setTab(CategoryItem.children);
              setCategoryBanner(CategoryItem.list_url_to_baner);
            }}
            style={isDarkTheme}
          >
            <Flex gap={"5px"}>
              {CategoryItem.list_url_to_image[0] && (
                <Image
                  style={isDarkThemeImage}
                  className={styles.MenuImg}
                  src={CategoryItem.list_url_to_image[0]}
                  width={16}
                  height={16}
                  alt={selectDataByLangCategory(CategoryItem, localActive)}
                />
              )}
              <Text>{selectDataByLangCategory(CategoryItem, localActive)}</Text>
            </Flex>
          </Button>
        ))}
      </div>
    </>
  );
}

const SelectMenuByLanguage = ({
  Category,
  localActive,
  isDarkThemeImage,
  urlCity,
}: {
  Category: Category[];
  localActive: string;
  isDarkThemeImage: CSSProperties;
  urlCity: string;
}) => {
  const router = useRouter();

  const arr = Category.map((item) => {
    const select = selectDataByLangCategory(item, localActive);

    const url = `/${localActive}/${urlCity}/products-in-category/${item.slug}/0/12/popular-first`;

    return {
      label: (
        <Flex
          gap={"5px"}
          onClick={() => {
            router.replace(url);
          }}
        >
          {item.list_url_to_image[0] && (
            <Image
              style={isDarkThemeImage}
              className={styles.MenuImg}
              src={item.list_url_to_image[0]}
              width={16}
              height={16}
              alt={select}
            />
          )}
          <Text>{select}</Text>
        </Flex>
      ),
      key: select,
    };
  });
  return arr;
};

function ButtomMenu({
  CurrentTab,
  localActive,
  isDarkThemeImage,
  urlCity,
}: {
  CurrentTab: Category[];
  localActive: string;
  isDarkThemeImage: CSSProperties;
  urlCity: string;
}) {
  return (
    <>
      <div id={styles.desktop} className={styles.HeaderMenuButton}>
        {CurrentTab && (
          <Menu
            id={styles.desktop}
            items={SelectMenuByLanguage({
              Category: CurrentTab,
              localActive: localActive,
              isDarkThemeImage: isDarkThemeImage,
              urlCity,
            })}
            mode="horizontal"
          />
        )}
      </div>
    </>
  );
}

export default function CustomMenu(urlCity: string) {
  const categories = useGetCategory();
  // const currentCategories = useCategoryStore((store)=>store.currentCategories);
  const { categoryTab, setCategoryTab } = useCategoryStore((store) => {
    return {
      categoryTab: store.categoryTab,
      setCategoryTab: store.setCategoryTab,
    };
  });
  const setCategoryBanner = useCategoryStore(
    (store) => store.setCategoryBanner
  );

  const localActive = useLocale();
  const { isDarkTheme, isDarkThemeImage } = useTheme();

  const componentTopMenu = (
    <TopMenu
      setTab={setCategoryTab}
      CategoryRoot={categories}
      isDarkTheme={isDarkTheme}
      isDarkThemeImage={isDarkThemeImage}
      localActive={localActive}
      setCategoryBanner={setCategoryBanner}
    />
  );

  const componentButtonMenu = categoryTab && (
    <ButtomMenu
      CurrentTab={categoryTab}
      isDarkThemeImage={isDarkThemeImage}
      localActive={localActive}
      urlCity={urlCity}
    />
  );

  return [componentTopMenu, componentButtonMenu];
}
