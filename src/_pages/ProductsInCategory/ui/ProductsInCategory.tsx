"use client";

import useCategoryStore from "@/_app/store/category";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";
import { ConfigProvider, Flex, Layout, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import style from "./ProductsInCategory.module.scss";
import { iCity } from "@/shared/types/city";
import { Category } from "@/shared/types/category";
import { Products } from "@/shared/types/products";
import { BannerProduct } from "@/widgets/BannerProduct";
import { CategoryProduct } from "@/widgets/CategoryProduct";
import { Filter } from "@/widgets/Filter";

const fetchByCatProduct = async (slug: string) => {
  const data = (await (await fetch(`/api/v1/products/filter_by_cat/${slug}`)).json()) as Products[];
  return data;
};

const fetchProductByIds = async (ids: number[]) => {
  const data = (await (await fetch(`/api/v1/products/by_ids/${ids.join(",")}`)).json()) as Products[];
  return data;
};

const fetchCurrentCategory = async (slug: string) => {
  const currentCategory = await (await fetch(`/api/v1/category/${slug}`)).json();
  return currentCategory;
};

function ifHaveParent(AllCategory: Category[], data: Category) {
  if (data.parent !== null) {
    const parent = AllCategory.find((item) => item.id === data.parent);
    if (parent) {
      return ifHaveParent(AllCategory, parent);
    }
    return null;
  }
  return data;
}

const findRootCategoryId = (AllCategory: Category[], ChildCategory: Category) => {
  const flatCategories = buildFlatCategory(AllCategory);
  const rootCategory = ifHaveParent(flatCategories, ChildCategory);
  return flatCategories.find((item) => item.id === rootCategory?.id);
};

export default function ProductsInCategory({
  params,
  Cities,
}: {
  params: {
    slug: string;
    city: string;
    page: number;
    limit: number;
    sort: string;
  };
  Cities: iCity[];
}) {
  const { slug, city, page, limit, sort } = params;
  const currentCity = Cities.find((i) => i.additional_data["EN"] === city)?.name_city || "Ошибка";
  const { CurrentTheme } = useTheme();
  const router = useRouter();
  const locale = useLocale();

  const [products, setProducts] = useState<Products[]>([]);
  const [paginationData, setPaginationData] = useState({ defaultCurrent: 1, total: 1 });
  const [filteredProductIds, setFilteredProductIds] = useState<number[]>([]);

  const { categories, currentCategory, setCategoryTab, setCurrentCategories } = useCategoryStore(
    (store) => ({
      categories: store.categories,
      currentCategory: store.currentCategories,
      setCategoryTab: store.setCategoryTab,
      setCurrentCategories: store.setCurrentCategories,
      setCategoryBanner: store.setCategoryBanner,
    })
  );

  const getSortFunc = useCallback(
    (sort: keyof Record<string, (a: Products, b: Products) => number>) => {
      const sortFunction: Record<string, (a: Products, b: Products) => number> = {
        "unpopular-first": (a: Products, b: Products) => Number(a.average_rating) - Number(b.average_rating),
        "popular-first": (a: Products, b: Products) => Number(b.average_rating) - Number(a.average_rating),
        "cheaper-first": (a: Products, b: Products) => (a.price?.[city] ?? Infinity) - (b.price?.[city] ?? Infinity),
        "expensive-first": (a: Products, b: Products) => (b.price?.[city] ?? 0) - (a.price?.[city] ?? 0),
      };
      return sortFunction[sort] ?? (() => 0);
    },
    [city]
  );

  useEffect(() => {
    fetchCurrentCategory(slug).then((data) => {
      setCurrentCategories(data);
      const rootCategory = findRootCategoryId(categories, data);
      if (rootCategory) {
        const rootChildren = categories.find((item) => item.id === rootCategory.id)?.children;
        if (rootChildren) setCategoryTab(rootChildren);
      }
    });

    const fetchProducts = async () => {
      let fetchedProducts: Products[] = [];
      if (filteredProductIds.length === 0) {
        fetchedProducts = await fetchByCatProduct(slug);
      } else {
        fetchedProducts = await fetchProductByIds(filteredProductIds);
      }

      const sortedProducts = fetchedProducts.sort(getSortFunc(sort));
      const totalProducts = sortedProducts.length;

      if (page <= -1 || limit <= 0) {
        setProducts(sortedProducts.slice(0, 12));
        setPaginationData({ defaultCurrent: 0, total: Math.ceil(totalProducts / 12) });
      } else {
        const start = page * limit;
        setProducts(sortedProducts.slice(start, start + limit));
        setPaginationData({ defaultCurrent: page, total: totalProducts });
      }
    };

    fetchProducts();
  }, [
    filteredProductIds,
    categories,
    limit,
    page,
    setCategoryTab,
    setCurrentCategories,
    slug,
    city,
    sort,
    getSortFunc,
  ]);

  const currentPage = (page: number) => (page <= 0 ? 1 : page + 1);

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities} />
            <HeaderMenu city={currentCity} urlCity={params.city} />
          </header>
          <section style={{ padding: "5px",marginBottom:"10px",marginTop:"10px" }}>
            <BannerProduct />
            <div className={style.ContainerProductsInCategory}>
              {currentCategory.id && (
                <Filter
                  slug_category={slug}
                  id_category={currentCategory.id}
                  setFiltredProductIds={setFilteredProductIds}
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
                showLessItems
                defaultCurrent={currentPage(Number(page))}
                total={paginationData.total}
                defaultPageSize={limit}
                pageSizeOptions={[12, 15, 18]}
                onChange={(page, pageSize) => {
                  router.replace(
                    `/${locale}/products-in-category/${slug}/${page - 1}/${pageSize}/${sort}`
                  );
                }}
              />
            </Flex>
          </section>
          <Footer params={params}/>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}