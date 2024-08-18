"use server";
import { ProductsInCategory } from "@/_pages/ProductsInCategory";
import fetchByCatProduct from "@/shared/api/v1/fetchByCatProduct";
import fetchCurrentCategory from "@/shared/api/v1/fetchCurrentCategory";
import getCities from "@/shared/api/v1/getCities";
import findRootCategoryId from "@/shared/tool/findRootCategoryId";
import { Products } from "@/shared/types/products";

const Page = async ({ params }: { params: any }) => {
  const { slug, city, page, limit, sort } = params;

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

  const fetchProducts = async () => {
    const fetchedProducts: Products[] = await fetchByCatProduct(slug);

    const sortedProducts = fetchedProducts.sort(getSortFunc(sort));
    const totalProducts = sortedProducts.length;
    if (page <= -1 || limit <= 0) {
      return {
        products: sortedProducts.slice(0, 12),
        paginationData: {
          defaultCurrent: 0,
          total: Math.ceil(totalProducts / 12),
        },
      };
    } else {
      const start = page * limit;
      return {
        products: sortedProducts.slice(start, start + limit),
        paginationData: { defaultCurrent: page, total: totalProducts },
      };
    }
  };

  const { products, paginationData } = await fetchProducts();
  const Cities = await getCities();

  return (
    <ProductsInCategory
      params={params}
      Cities={Cities}
      products={products}
      paginationData={paginationData}
    />
  );
};

export default Page;
