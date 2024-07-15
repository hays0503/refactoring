"use client";

import useCategoryStore from "@/_app/store/category";
import { AllCategory } from "@/entities/AllCategory";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";

import { Category } from "@/shared/types/category";
import { Products } from "@/shared/types/products";
import { BannerProduct } from "@/widgets/BannerProduct";
import { CategoryProduct } from "@/widgets/CategoryProduct";
import { ConfigProvider, Flex, Layout, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetchPopularProduct = async (slug: string) => {
  const data = (await (
    await fetch(`/api/v1/products/filter_by_cat/${slug}`, {
      cache: "force-cache",
    })
  ).json()) as Products[];
  return [...data];
};

const fetchCurrentCategory = async (slug: string) => {
  const currentCategory = await (
    await fetch(`/api/v1/category/${slug}`, { cache: "force-cache" })
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
}: {
  params: { slug: string; page: number; limit: number };
}) {
  const { slug, page, limit } = params;

  const { CurrentTheme } = useTheme();
  const route = useRouter();
  const localActive = useLocale();

  const [products, setProducts] = useState<Products[]>([]);
  const [paginationData, setPaginationData] = useState({
    defaultCurrent: 1,
    total: 1,
  } as { defaultCurrent: number; total: number });

  const {
    categories,
    currentCategory,
    categoryTab,
    setCategoryTab,
    setCurrentCategories,
    setCategoryBanner,
  } = useCategoryStore((store) => {
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
    fetchPopularProduct(slug).then((data) => {
      if (page <= -1 || limit <= 0) {
        setProducts(data.slice(0, 12));
        setPaginationData({
          defaultCurrent: 0,
          total: Math.round(data.length / 12),
        });
      } else {
        const start: number = Number(page) * Number(limit);
        const end: number = start + Number(limit);
        setProducts(data.slice(start, end));
        setPaginationData({ defaultCurrent: page, total: data.length });
      }
    });
  }, [categories,limit, page, setCategoryTab, setCurrentCategories,slug]);

  const pageCurrent = (page: number) => {
    if (page <= 0) {
      return 1;
    } else {
      return page + 1;
    }
  };

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header />
            <HeaderMenu />
          </header>
          <section style={{ padding: "10px", minHeight: "calc(100vh)" }}>
            {/* Место для баннера */}
            <BannerProduct />
            {/* Продукты определённой категории */}
            <CategoryProduct
              products={products}
              currentCategory={currentCategory}
              params={params}
            />
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
                    }/${pageSize}`
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
