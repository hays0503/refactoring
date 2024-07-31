"use client";

import useCategoryStore from "@/_app/store/category";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";

import { Category } from "@/shared/types/category";
import { Products } from "@/shared/types/products";
import { BannerProduct } from "@/widgets/BannerProduct";
import { CategoryProduct } from "@/widgets/CategoryProduct";
import { Filter } from "@/widgets/Filter";
import { ConfigProvider, Divider, Flex, Layout, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./ProductsInCategory.module.scss";
import { iCity } from "@/shared/types/city";

const fetchByCatProduct = async (slug: string) => {
  const data = (await (
    await fetch(`/api/v1/products/filter_by_cat/${slug}`)
  ).json()) as Products[];
  return [...data];
};

const fetchProductByIds = async (ids: number[]) => {
  const data = (await (
    await fetch(`/api/v1/products/by_ids/${ids.join(",")}`)
  ).json()) as Products[];
  return data;
};

const fetchCurrentCategory = async (slug: string) => {
  const currentCategory = await (
    await fetch(`/api/v1/category/${slug}`)
  ).json();
  return currentCategory;
};

function ifHaveParrent(AllCategory: Category[], data: Category) {
  if (data.parent !== null) {
    const parent: Category | undefined = AllCategory.find(
      (item) => item.id === data.parent
    );
    if (parent) {
      return ifHaveParrent(AllCategory, parent);
    } else {
      return null;
    }
  } else {
    return data;
  }
}

const findRootCategoryId = (
  AllCategory: Category[],
  ChildCategory: Category
) => {
  const _flat: Category[] = buildFlatCategory(AllCategory);
  const id = ifHaveParrent(_flat, ChildCategory);
  return _flat.find((item) => item.id === id?.id);
};

export default function ProductsInCategory({
  params,
  Cities
}: {
  params: {
    slug: string;
    city: string;
    page: number;
    limit: number;
    sort: string;
  };
  Cities:iCity[]
}) {
  const { slug, city, page, limit, sort } = params;

  const currentCity:string = Cities.find((i) => i.additional_data['EN'] === params.city)?.name_city||"Ошибка";

  const { CurrentTheme } = useTheme();
  const route = useRouter();
  const localActive = useLocale();

  const [products, setProducts] = useState<Products[]>([]);

  const [paginationData, setPaginationData] = useState({
    defaultCurrent: 1,
    total: 1,
  } as { defaultCurrent: number; total: number });

  const [filtredProductIds, setFiltredProductIds] = useState<number[]>([]);

  const { categories, currentCategory, setCategoryTab, setCurrentCategories } =
    useCategoryStore((store) => {
      return {
        categories: store.categories,
        currentCategory: store.currentCategories,
        categoryTab: store.categoryTab,
        setCategoryTab: store.setCategoryTab,
        setCurrentCategories: store.setCurrentCategories,
        setCategoryBanner: store.setCategoryBanner,
      };
    });


  useEffect(() => {
    fetchCurrentCategory(slug).then((data) => {
      setCurrentCategories(data);
      const find = findRootCategoryId(categories, data);
      if (find) {
        const root = categories.find((Item) => Item.id === find.id)?.children;
        if (root) setCategoryTab(root);
      }
    });
    if (filtredProductIds.length === 0) {
      fetchByCatProduct(slug).then((data) => {
        const sortData = data.sort(getSortFunc(sort));
        const a = sortData.map((i) => {
          return i?.price;
        });
        if (page <= -1 || limit <= 0) {
          const productData = sortData.slice(0, 12);
          setProducts(productData);
          setPaginationData({
            defaultCurrent: 0,
            total: Math.round(sortData.length / 12),
          });
        } else {
          const start: number = Number(page) * Number(limit);
          const end: number = start + Number(limit);
          const productData = sortData.slice(start, end);
          setProducts(productData);
          setPaginationData({ defaultCurrent: page, total: sortData.length });
        }
      });
    } else {
      fetchProductByIds(filtredProductIds).then((data) => {
        const sortData = data.sort(getSortFunc(sort));
        const a = sortData.map((i) => {
          return i?.price;
        });
        if (page <= -1 || limit <= 0) {
          const productData = sortData.slice(0, 12);
          setProducts(productData);
          setPaginationData({
            defaultCurrent: 0,
            total: Math.round(sortData.length / 12),
          });
        } else {
          const start: number = Number(page) * Number(limit);
          const end: number = start + Number(limit);
          const productData = sortData.slice(start, end);
          setProducts(productData);
          setPaginationData({ defaultCurrent: page, total: sortData.length });
        }
      });
    }
  }, [
    filtredProductIds,
    categories,
    limit,
    page,
    setCategoryTab,
    setCurrentCategories,
    slug,
    city,
  ]);

  const pageCurrent = (page: number) => {
    if (page <= 0) {
      return 1;
    } else {
      return page + 1;
    }
  };

  const sortFunction = {
    "unpopular-first": (a: Products, b: Products) => {
      const ratingA = Number(a.average_rating);
      const ratingB = Number(b.average_rating);
      return ratingA - ratingB;
    },
    "popular-first": (a: Products, b: Products) => {
      const ratingA = Number(a.average_rating);
      const ratingB = Number(b.average_rating);
      return ratingB - ratingA;
    },
    "cheaper-first": (a: Products, b: Products) => {
      if (a.price?.[city] !== undefined && b.price?.[city] !== undefined) {
        return Number(a.price[city]) - Number(b.price[city]);
      }

      if (a.price?.[city] !== undefined) return -1;
      if (b.price?.[city] !== undefined) return 1;
      return 0;
    },
    "expensive-first": (a: Products, b: Products) => {
      console.log("city", city);
      if (a.price?.[city] !== undefined && b.price?.[city] !== undefined) {
        return Number(b.price[city]) - Number(a.price[city]);
      }

      if (a.price?.[city] !== undefined) return 1;
      if (b.price?.[city] !== undefined) return -1;
      return 0;
    },
  };

  const getSortFunc = (sort: string) => {
    switch (sort) {
      case "popular-first":
        return sortFunction["popular-first"];
      case "unpopular-first":
        return sortFunction["unpopular-first"];
      case "cheaper-first":
        return sortFunction["cheaper-first"];
      case "expensive-first":
        return sortFunction["expensive-first"];
    }
  };

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities}/>
            <HeaderMenu city={currentCity} urlCity={params.city}/>
          </header>
          <section style={{ padding: "5px", minHeight: "calc(100vh)" }}>
            {/* Место для баннера */}
            <BannerProduct />

            {/* Продукты определённой категории */}
            <div className={style.ContainerProductsInCategory}>
              {currentCategory.id && (
                <Filter
                  slug_category={slug}
                  id_category={currentCategory.id}
                  filtredProductIds={filtredProductIds}
                  setFiltredProductIds={setFiltredProductIds}
                />
              )}

              {currentCategory.id && (
                <CategoryProduct
                  products={products}
                  currentCategory={currentCategory}
                  currentCity={currentCity}
                  params={params}
                />
              )}
            </div>
            <Flex justify="center">
              <Pagination
                showSizeChanger
                showLessItems={true}
                defaultCurrent={pageCurrent(Number(page))}
                total={paginationData.total}
                defaultPageSize={limit}
                pageSizeOptions={[12, 15, 18]}
                onChange={(page, pageSize) => {
                  route.replace(
                    `/${localActive}/products-in-category/${slug}/${
                      page - 1
                    }/${pageSize}/${sort}`
                  );
                }}
              />
            </Flex>
          </section>
          <Footer />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
