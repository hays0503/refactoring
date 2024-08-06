"use client";


import { Popover, Button, Collapse, CollapseProps } from "antd";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import style from "./AllCategory.module.scss";
import { useRouter } from "next/navigation";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import { Category } from "@/shared/types/category";
import useTheme from "@/shared/hook/useTheme";
import useGetCategory from "@/shared/hook/useGetCategory";
import { useLocale, useTranslations } from "next-intl";

function BuildCategoryWidgetPopUp({
  Category,
  isDarkThemeImage,
  localActive,
  city,
  urlCity
}: {
  Category: Category[];
  isDarkThemeImage: CSSProperties;
  localActive:string;
  city:string;
  urlCity:string
}) {


  const router = useRouter();

  const [selectCategoryL1, setSelectCategoryL1] = useState<Category[]>(
    Category[0].children
  );
  const [selectCategoryL2, setSelectCategoryL2] = useState<Category[] | null>(
    null
  );
  const [selectCategoryL3, setSelectCategoryL3] = useState<Category[] | null>(
    null
  );
  const [selectCategoryL4, setSelectCategoryL4] = useState<Category[] | null>(
    null
  );
  const [selectCategoryL5, setSelectCategoryL5] = useState<Category[] | null>(
    null
  );
  const [currentLevel, setCurrentLevel] = useState<number>(2);

  if (Category === undefined) return <div>Ошибка загрузки категорий</div>;
  //Главное меню категорий расположение слева за разделителем
  const Menu = ({
    _level,
    _Category,
    _selectRootCategory,
    _setSelectRootCategory,
  }: {
    _level: number;
    _Category: any;
    _selectRootCategory: any;
    _setSelectRootCategory: any;
  }) => {
    if (currentLevel + 1 < _level) {
      return <></>;
    } else {
      return (
        <>
          <ul className={`${style.list} ${style.SubContainer} `}>
            {_Category &&
              _Category.map((item: Category) => {
                const isSelect = _selectRootCategory === item.children;
                const text = selectDataByLangCategory(item, localActive);
                return (
                  <li
                    key={item.id}
                    className={style.Row}
                    style={
                      isSelect
                        ? { backgroundColor: "#fec10d", borderRadius: "10px" }
                        : {}
                    }
                    onMouseEnter={() => {
                      _setSelectRootCategory(item.children);
                      setCurrentLevel(_level);
                    }}
                    onClick={() =>
                      router.replace(
                        `/${localActive}/${urlCity}/products-in-category/${item.slug}/0/12/popular-first`
                      )
                    }
                    // onMouseLeave={() => _setSelectRootCategory(null)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {item.list_url_to_image[0] && (
                        <Image
                          style={isDarkThemeImage}
                          className={style.MenuImgCategory}
                          src={item.list_url_to_image[0]}
                          width={32}
                          height={32}
                          alt={text}
                        />
                      )}
                      <span className={style.hoverSpan}>{text}</span>
                    </div>
                    {item?.children.length !== 0 && <span>{">"}</span>}
                  </li>
                );
              })}
          </ul>
        </>
      );
    }
  };

  return (
    <div className={style.MainContainer}>
      <Menu
        _level={1}
        _Category={Category}
        _selectRootCategory={selectCategoryL1}
        _setSelectRootCategory={setSelectCategoryL1}
      />
      <Menu
        _level={2}
        _Category={selectCategoryL1}
        _selectRootCategory={selectCategoryL2}
        _setSelectRootCategory={setSelectCategoryL2}
      />
      <Menu
        _level={3}
        _Category={selectCategoryL2}
        _selectRootCategory={selectCategoryL3}
        _setSelectRootCategory={setSelectCategoryL3}
      />
      <Menu
        _level={4}
        _Category={selectCategoryL3}
        _selectRootCategory={selectCategoryL4}
        _setSelectRootCategory={setSelectCategoryL4}
      />
      <Menu
        _level={5}
        _Category={selectCategoryL4}
        _selectRootCategory={selectCategoryL5}
        _setSelectRootCategory={setSelectCategoryL5}
      />
    </div>
  );
}

export default function AllCategory({city,urlCity}:{city:string,urlCity:string}) {

  const Category = useGetCategory();

  const localActive = useLocale();
  const t = useTranslations();

  const { isDarkThemeImage } = useTheme();

  const AllCategory = (_Category: any) =>
    _Category.map((item: any) => {
      return (
        <>
          <li className={style.Row}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.list_url_to_image[0] && (
                <Image
                  style={isDarkThemeImage}
                  className={style.MenuImgCategory}
                  src={item.list_url_to_image[0]}
                  width={32}
                  height={32}
                  alt={selectDataByLangCategory(item, localActive)}
                />
              )}
              <span>{selectDataByLangCategory(item, localActive)}</span>
            </div>
          </li>
          {AllCategory(item.children)}
        </>
      );
    });

  const AllCategoryRecursive = () => {
    return (
      <ul className={style.list}>
        {Category.map((item: Category) => (
          <>{AllCategory(item.children)}</>
        ))}
      </ul>
    );
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: t("vse-kategorii"),
      children: <AllCategoryRecursive />,
    },
  ];

  if (Category.length===0)
    return "Категории не определенны"

  const content = () => BuildCategoryWidgetPopUp({ Category, isDarkThemeImage,localActive,urlCity,city }); 
  
  return (
    <>
      <div id={style.desktop}>
        <Popover
          content={content}
          title="Перечень категорий"
          placement="bottomLeft"
          trigger={["click"]}
        >
          <Button
            type="text"
            style={{
              color: "white",
            }}
          >
            <Image
              src={"/burger.svg"}
              width={32}
              height={32}
              alt="burgerIcon"
            />
            {t("vse-kategorii")}
          </Button>
        </Popover>
      </div>

      <div id={style.mobile} style={{ width: "100dvw" }}>
        <Collapse accordion ghost items={items} />
      </div>
    </>
  );
}
