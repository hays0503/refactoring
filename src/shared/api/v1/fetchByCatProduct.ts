import { Products } from "@/shared/types/products";

const fetchByCatProduct = async (slug: string) => {
  const data = (await (
    await fetch(`http://pimenov.kz/api/v1/products/filter_by_cat/${slug}`)
  ).json()) as Products[];
  return data;
};

export default fetchByCatProduct;
