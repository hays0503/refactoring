import { revalidateConfig } from "@/shared/config/revalidateConfig";
import { Products } from "@/shared/types/products";

const fetchProductByIds = async (ids: number[]) => {
  const data = (await (
    await fetch(`/api/v1/products/by_ids/${ids.join(",")}`, {
      next: revalidateConfig["/api/v1/products/by_ids"],
    })
  ).json()) as Products[];
  return data;
};

export default fetchProductByIds;
