import { Products } from "@/shared/types/products";

const fetchProductByIds = async (ids: number[]) => {
  const data = (await (
    await fetch(`/api/v1/products/by_ids/${ids.join(",")}`)
  ).json()) as Products[];
  return data;
};

export default fetchProductByIds;
