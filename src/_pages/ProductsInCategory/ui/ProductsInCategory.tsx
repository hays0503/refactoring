"use client";

// import useCategoryStore from "@/_app/store/category";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
// import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";
import { ConfigProvider, Flex, Layout, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import style from "./ProductsInCategory.module.scss";
import { iCity } from "@/shared/types/city";
// import { Category } from "@/shared/types/category";
import { Products } from "@/shared/types/products";
import { BannerProduct } from "@/widgets/BannerProduct";
import fetchCurrentCategory from "@/shared/api/v1/fetchCurrentCategory";
import useCategoryStore from "@/_app/store/category";
import findRootCategoryId from "@/shared/tool/findRootCategoryId";
import { CategoryProduct } from "@/widgets/CategoryProduct";
import { useShallow } from "zustand/react/shallow";
// import { CategoryProduct } from "@/widgets/CategoryProduct";
import { Filter } from "@/widgets/Filter";
// import fetchCurrentCategory from "../../../shared/api/v1/fetchCurrentCategory";
// import fetchByCatProduct from "../../../shared/api/v1/fetchByCatProduct";
// import fetchProductByIds from "../../../shared/api/v1/fetchProductByIds";
// import findRootCategoryId from "../utils/findRootCategoryId";

interface IProductsInCategory {
  params: {
    slug: string;
    city: string;
    page: number;
    limit: number;
    sort: string;
    
  };
  Cities: iCity[];
  products: Products[];
  paginationData: {
    defaultCurrent: number;
    total: number;
  };
}

export default function ProductsInCategory({
  params,
  Cities,
  products,
  paginationData,
}: IProductsInCategory) {
  const { slug, city, page, limit, sort } = params;
  const currentCity = Cities.find((i) => i.additional_data["EN"] === city)?.name_city || "Ошибка";
  const { CurrentTheme } = useTheme();
  const router = useRouter();
  const locale = useLocale();

  const [filteredProductIds ,setFilteredProductIds] = useState<number[]>([]);

  const { currentCategory, setCurrentCategories } = useCategoryStore(
    useShallow((state) => ({
      currentCategory: state.currentCategories,
      setCurrentCategories: state.setCurrentCategories,
    }))
  );


  useEffect(() => {
    fetchCurrentCategory(slug).then((data) => {
      setCurrentCategories(data);
      // const rootCategory = findRootCategoryId(categories, data);
      // if (rootCategory) {
      //   const rootChildren = categories.find((item) => item.id === rootCategory.id)?.children;
      //   if (rootChildren) setCategoryTab(rootChildren);
      // }
    });
  }, [
    slug,
  ]);

  const currentPage = (page: number) => (page <= 0 ? 1 : page + 1);

  console.log("currentCategory", currentCategory);

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities} />
            <HeaderMenu city={currentCity} urlCity={params.city} />
          </header>
          <section
            style={{ padding: "5px", marginBottom: "10px", marginTop: "10px" }}
          >
            {/* <BannerProduct /> */}
            <div className={style.ContainerProductsInCategory}>
              {currentCategory.id && (
                <Filter
                  params={params}
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
            {/* <Flex justify="center">
              <Pagination
                showSizeChanger
                showLessItems
                defaultCurrent={currentPage(Number(page))}
                total={paginationData.total}
                defaultPageSize={limit}
                pageSizeOptions={[12, 15, 18]}
                onChange={(page, pageSize) => {
                  router.replace(
                    `/${locale}/products-in-category/${slug}/${
                      page - 1
                    }/${pageSize}/${sort}`
                  );
                }}
              />
            </Flex> */}
          </section>
          <Footer params={params} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
