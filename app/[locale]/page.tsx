import { MainPage } from "@/_pages/MainPage";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";
import { revalidateTag } from 'next/cache'

const fetchPopularProduct = async () => {
  const limit = 16;
  const data = (await (
    await fetch(`http://185.100.67.246:8888/api/v1/populates/?limit=${limit}`, {
      mode: "cors",
      credentials: "include",
      next: { tags: ['fetchPopularProduct']}
    })
  ).json()) as Populates[];
  return data;
};

const fetchProductByIds = async (ids: number[]) => {
  const data = (await (
    await fetch(
      `http://185.100.67.246:8888/api/v1/products/by_ids/${ids.join(",")}`,
      {
        mode: "cors",
        credentials: "include",
        next: { tags: ['fetchProductByIds']}
      }
    )
  ).json()) as Products[];
  return data;
};


async function MPage() {
  const populatesId: Populates[] = await fetchPopularProduct();

  const flatProductId: number[] = populatesId
    .map((product) => product.products)
    .flat();

  const populatest = await fetchProductByIds(flatProductId);

  return <MainPage populates={populatest} />;
}

const Page = async ({}) => {
  return <MPage />;
};

export default Page;
