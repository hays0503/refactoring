import useGetCategory from "@/shared/hook/useGetCategory";
import useTheme from "@/shared/hook/useTheme";
import { selectDataByLangCategory } from "@/shared/tool/selectDataByLang";
import { Category } from "@/shared/types/category";
import { Button, Flex, List, Typography, Image } from "antd";
import { useLocale } from "next-intl";
import Link from "next/link";
import {useRef, useState } from "react";

const { Title, Text } = Typography;

export default function CatalogMobile({ params }: { params: any }) {
  const categories = useGetCategory();
  const localeActive = useLocale();
  const [levelCategories, setLevelCategories] = useState<number>(0);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const stack = useRef<Category[]>([]);

  const {isDarkTheme,isDarkThemeImage} = useTheme();


  const toCategoryNext = (id: number) => {
    if (selectCategories.length === 0) {
      console.log(id);
      const category = categories.find((category) => category.id === id);
      console.log(category);
      if (category) {
        stack.current.push(category.children);
        setSelectCategories(category.children);
      }
    } else {
      console.log(id);
      const category = selectCategories.find(
        (category: Category) => category.id === id
      );
      console.log(category);
      if (category) {
        stack.current.push(category.children);
        setSelectCategories(category.children);
      }
    }
    console.log("stack.current", stack.current);
  };

  const toCategoryBack = () => {
    const last = stack.current.length-2;
    console.log(last)
    console.log(stack.current)
    if(last >= 0){
      setSelectCategories(stack.current[last]);
      stack.current.pop();
    }else{
      stack.current=[];
      setSelectCategories(categories);
    }

  };

  console.log("params",params)

  return (
    <>
      <Button onClick={() => toCategoryBack()} style={{ width: "100%" }}>
        Назад
      </Button>
      <div
        style={{
          height: "60dvh",
          overflow: "auto",
        }}
      >
        <List
          dataSource={
            selectCategories.length === 0 ? categories : selectCategories
          }
          renderItem={(item, index) => (
            <List.Item style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "90%" }}
              >
                <Link href={`/${localeActive}/${params.city}/products-in-category/${item.slug}/0/12/popular-first`}>
                <Flex
                  style={{ height: "100%", width: "90%" }}
                  align="center"
                  gap={"10px"}
                >
                  
                  <Image
                    style={isDarkThemeImage}
                    preview={false} 
                    fallback={"/warningicon.webp"}
                    src={item.list_url_to_image[0]}
                    alt="icon"
                    width={24}
                    height={24} 
                    />
                  <Text>
                    {`${item.id}. ${selectDataByLangCategory(
                      item,
                      localeActive
                    )}`}
                  </Text>
                </Flex>
                </Link>
                {item.children.length > 0 && (
                  <Button onClick={() => toCategoryNext(item.id)} type="dashed">
                    {">"}
                  </Button>
                )}
              </Flex>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
