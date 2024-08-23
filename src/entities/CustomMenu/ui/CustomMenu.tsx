import { Category } from "@/shared/types/category";
import styles from "./CustomMenu.module.scss";
import { Button, Flex, Menu, MenuProps, Typography } from "antd";
import Image from "next/image";
import { CSSProperties, memo, useCallback, useMemo } from "react";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import { useLocale } from "next-intl";
import useTheme from "@/shared/hook/useTheme";
import useGetCategory from "@/shared/hook/useGetCategory";
import { useRouter } from "next/navigation";
import useCategoryStore from "@/_app/store/category";
import { shallow } from "zustand/shallow";

const { Text } = Typography;

const TopMenu = memo(
  ({
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
  }) => {
    const handleClick = useCallback(
      (CategoryItem: Category) => {
        setTab(CategoryItem.children);
        setCategoryBanner(CategoryItem.list_url_to_baner);
      },
      [setTab, setCategoryBanner]
    );

    return (
      <div id={styles.desktop} className={styles.HeaderMenuTop}>
        {CategoryRoot.map((CategoryItem) => (
          <Button
            key={CategoryItem.id}
            type="text"
            size="small"
            onClick={() => handleClick(CategoryItem)}
            style={isDarkTheme}
          >
            <Flex gap="5px">
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
              <Text className={styles.Hover}>{selectDataByLangCategory(CategoryItem, localActive)}</Text>
            </Flex>
          </Button>
        ))}
      </div>
    );
  }
);
TopMenu.displayName = "TopMenu";

const SelectMenuByLanguage = (
  Category: Category[],
  localActive: string,
  isDarkThemeImage: CSSProperties,
  urlCity: string
): MenuProps["items"] => {
  const router = useRouter();


  return Category.map((item) => {
    const select = selectDataByLangCategory(item, localActive);
    const url = `/${localActive}/${urlCity}/products-in-category/${item.slug}/0/12/popular-first`;

    return {
      key: item.id.toString(),
      label: (
        <span
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
        </span>
      ),
    };
  });
};

const ButtonMenu = memo(
  ({
    CurrentTab,
    localActive,
    isDarkThemeImage,
    urlCity,
  }: {
    CurrentTab: Category[];
    localActive: string;
    isDarkThemeImage: CSSProperties;
    urlCity: string;
  }) => (
    <div id={styles.desktop} className={styles.HeaderMenuButton}>
      {CurrentTab && (
        <Menu
          id={styles.desktop}
          items={SelectMenuByLanguage(
            CurrentTab,
            localActive,
            isDarkThemeImage,
            urlCity
          )}
          mode="horizontal"
        />
      )}
    </div>
  )
);
ButtonMenu.displayName = "ButtonMenu";

export default function CustomMenu({ urlCity }: { urlCity: string }) {
  const categories = useGetCategory();
  const [categoryTab, setCategoryTab, setCategoryBanner] = useCategoryStore(
    (state) => [
      state.categoryTab,
      state.setCategoryTab,
      state.setCategoryBanner,
    ],
    shallow
  );

  // const categoryTab = useCategoryStore(state => state.categoryTab);
  // const setCategoryTab = useCategoryStore(state => state.setCategoryTab);
  // const setCategoryBanner = useCategoryStore(state => state.setCategoryBanner);

  const localActive = useLocale();
  const { isDarkTheme, isDarkThemeImage } = useTheme();

  const componentTopMenu = useMemo(
    () => (
      <TopMenu
        setTab={setCategoryTab}
        CategoryRoot={categories}
        isDarkTheme={isDarkTheme}
        isDarkThemeImage={isDarkThemeImage}
        localActive={localActive}
        setCategoryBanner={setCategoryBanner}
      />
    ),
    [
      categories,
      isDarkTheme,
      isDarkThemeImage,
      localActive,
      setCategoryTab,
      setCategoryBanner,
    ]
  );

  const componentButtonMenu = useMemo(
    () =>
      categoryTab && (
        <ButtonMenu
          CurrentTab={categoryTab}
          isDarkThemeImage={isDarkThemeImage}
          localActive={localActive}
          urlCity={urlCity}
        />
      ),
    [categoryTab, isDarkThemeImage, localActive, urlCity]
  );

  return [componentTopMenu, componentButtonMenu];

  return [<></>, <></>];
}
