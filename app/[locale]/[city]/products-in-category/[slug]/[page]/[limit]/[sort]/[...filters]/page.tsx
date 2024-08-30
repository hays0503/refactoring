"use server";
import { ProductsInCategory } from "@/_pages/ProductsInCategory";
import fetchByCatProduct from "@/shared/api/v1/fetchByCatProduct";
import fetchCurrentCategory from "@/shared/api/v1/fetchCurrentCategory";
import getCities from "@/shared/api/v1/getCities";
import { revalidateConfig } from "@/shared/config/revalidateConfig";
import findRootCategoryId from "@/shared/tool/findRootCategoryId";
import parseFilters from "@/shared/tool/parseFilters";
import { Products } from "@/shared/types/products";

const Page = async ({ params }: { params: any }) => {
  const { slug, city, page, limit, sort, filters } = params;

  const getSortFunc = (
    sort: keyof Record<string, (a: Products, b: Products) => number>
  ) => {
    const sortFunction: Record<string, (a: Products, b: Products) => number> = {
      "unpopular-first": (a: Products, b: Products) =>
        Number(a.average_rating) - Number(b.average_rating),
      "popular-first": (a: Products, b: Products) =>
        Number(b.average_rating) - Number(a.average_rating),
      "cheaper-first": (a: Products, b: Products) =>
        (a.price?.[city] ?? Infinity) - (b.price?.[city] ?? Infinity),
      "expensive-first": (a: Products, b: Products) =>
        (b.price?.[city] ?? 0) - (a.price?.[city] ?? 0),
    };
    return sortFunction[sort] ?? (() => 0);
  };

  const paramFilters: any = parseFilters(filters);

  const fetchProductsId = (paramFilters: any) => {
    return fetch("http://pimenov.kz/api/v1/products/set/filter", {
      next: revalidateConfig["/api/v1/products/set/filter"],
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(paramFilters),
    })
      .then((response) => response.json())
      .then((data) =>
        data.map((item: { id: number; slug: string }) => item.id)
      );
  };

  const ProductsId = await fetchProductsId(paramFilters);
  const Cities = await getCities();
  if (ProductsId.length != 0) {
    const domain = "http://pimenov.kz";
    const url = `${domain}/api/v1/products/by_ids/${ProductsId.join(",")}`;
    const productsFetch = await (
      await fetch(url, { next: revalidateConfig["/api/v1/products/by_ids"] })
    ).json();

    const sortedProducts = productsFetch.sort(getSortFunc(sort));
    const totalProducts = sortedProducts.length;

    if (page <= -1 || limit <= 0) {
      return (
        <ProductsInCategory
          params={params}
          Cities={Cities}
          products={sortedProducts.slice(0, 12)}
          paginationData={{
            defaultCurrent: 0,
            total: Math.ceil(totalProducts / 12),
          }}
        />
      );
    } else {
      const start = page * limit;
      return (
        <ProductsInCategory
          params={params}
          Cities={Cities}
          products={sortedProducts.slice(start, start + limit)}
          paginationData={{ defaultCurrent: page, total: totalProducts }}
        />
      );
    }
  } else {
    return (
      <ProductsInCategory
        params={params}
        Cities={Cities}
        products={[]}
        paginationData={{
          defaultCurrent: 0,
          total: 1,
        }}
      />
    );
  }
};

export default Page;
