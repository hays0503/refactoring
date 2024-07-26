import { Category } from "@/shared/types/category";
import styles from "./CustomMenu.module.scss";
import { Button, Menu, Typography } from "antd";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import { useLocale } from "next-intl";
import useTheme from "@/shared/hook/useTheme";
import useGetCategory from "@/shared/hook/useGetCategory";
import { useRouter } from "next/navigation";
import useCategoryStore from "@/_app/store/category";
import Link from "next/link";

const { Text } = Typography;

function TopMenu({
  CategoryRoot,
  isDarkTheme,
  isDarkThemeImage,
  localActive,
  setTab,
  setCategoryBanner
}: {
  CategoryRoot: Category[];
  isDarkTheme: CSSProperties;
  isDarkThemeImage: CSSProperties;
  localActive: string;
  setTab:(Tab:Category[])=>void;
  setCategoryBanner:(categoryBanner: string[])=>void;
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
              setTab(CategoryItem.children)
              setCategoryBanner(CategoryItem.list_url_to_baner)
            }}
            style={isDarkTheme}
          >
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
}: {
  Category: Category[];
  localActive: string;
  isDarkThemeImage: CSSProperties;
}) => {

  const router = useRouter();

  const arr = Category.map((item) => {
    const select = selectDataByLangCategory(item, localActive);

    const url = `/${localActive}/products-in-category/${item.slug}/0/12/popular-first`;


    return {
      label: (
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
          }}
          // href={url}
          onClick={() =>{
            // alert(url);
            router.replace(`/${localActive}/products-in-category/${item.slug}/0/12/popular-first`)
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
          {select}
        </Text>
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
}: {
  CurrentTab: Category[];
  localActive: string;
  isDarkThemeImage: CSSProperties;
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
            })}
            mode="horizontal"
          />
        )}
      </div>
    </>
  );
}

export default function CustomMenu() {
  const categories = useGetCategory();
  // const currentCategories = useCategoryStore((store)=>store.currentCategories);
  const {categoryTab,setCategoryTab} = useCategoryStore((store)=>{
    return {
      categoryTab:store.categoryTab,
      setCategoryTab:store.setCategoryTab
    }
  })
  const setCategoryBanner = useCategoryStore((store)=>store.setCategoryBanner)

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

  const componentButtonMenu = (
    categoryTab && <ButtomMenu
      CurrentTab={categoryTab}
      isDarkThemeImage={isDarkThemeImage}
      localActive={localActive}
    />
  );

  return [componentTopMenu,componentButtonMenu];
}
