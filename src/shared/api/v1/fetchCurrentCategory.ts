import { revalidateConfig } from "@/shared/config/revalidateConfig";

const fetchCurrentCategory = async (slug: string) => {
    const currentCategory = await (await fetch(`/api/v1/category/${slug}`,{
      next: revalidateConfig["/api/v1/category"],
    })).json();
    return currentCategory;
  };
export default fetchCurrentCategory;