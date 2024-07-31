import { MainPage } from "@/_pages/MainPage";
import { iCity } from "@/shared/types/city";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";

const fetchPopularProduct = async () => {
  const limit = 16;
  const data = (await (
    await fetch(`http://185.100.67.246:8888/api/v1/populates/?limit=${limit}`, {
      mode: "cors",
      credentials: "include",
      next: { tags: ["fetchPopularProduct"],revalidate:1 },
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
        next: { tags: ["fetchProductByIds"],revalidate:60 },
      }
    )
  ).json()) as Products[];
  return data;
};

const fetchCities = async () => {
  return [
    {
      id: 1,
      additional_data: {
        EN: "Petropavlovsk",
        KZ: "",
      },
      name_city: "Петропавловск",
    },
    {
      id: 2,
      additional_data: {
        EN: "Astana",
        KZ: "",
      },
      name_city: "Астана",
    },
  ];
};

async function MPage({ params }: { params: any }) {
  const populatesId: Populates[] = await fetchPopularProduct();

  const flatProductId: number[] = populatesId
    .map((product) => product.products)
    .flat();

  const populatest = await fetchProductByIds(flatProductId);

  const Cities:iCity[] = await fetchCities();

  return <MainPage params={params} populates={populatest} Cities={Cities} />;
}

const Page = async ({ params }: { params: any }) => {
  return <MPage params={params} />;
};

export default Page;
