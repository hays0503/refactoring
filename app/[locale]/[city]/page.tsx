import { MainPage } from "@/_pages/MainPage";
import { iCity } from "@/shared/types/city";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";

const fetchPopularProduct = async (): Promise<Populates[]> => {
  try {
    const limit = 16;
    const response = await fetch(`http://185.100.67.246:8888/api/v1/populates/?limit=${limit}`, {
      mode: "cors",
      credentials: "include",
      next: { tags: ["fetchPopularProduct"], revalidate:60 },
    });
    if (!response.ok) {
      throw new Error(`Error fetching popular products: ${response.statusText}`);
    }
    const data = await response.json() as Populates[];
    return data;
  } catch (error) {
    console.error('Error in fetchPopularProduct:', error);
    return [];
  }
};

const fetchProductByIds = async (ids: number[]): Promise<Products[]> => {
  try {
    const response = await fetch(`http://185.100.67.246:8888/api/v1/products/by_ids/${ids.join(",")}`, {
      mode: "cors",
      credentials: "include",
      next: { tags: ["fetchProductByIds"], revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error(`Error fetching products by IDs: ${response.statusText}`);
    }
    const data = await response.json() as Products[];

    return data;
  } catch (error) {
    console.error('Error in fetchProductByIds:', error);
    return [];
  }
};

const fetchCities = async (): Promise<iCity[]> => {
  try {
    const cities = [
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
    // console.log('Fetched cities:', cities);
    return cities;
  } catch (error) {
    console.error('Error in fetchCities:', error);
    return [];
  }
};

async function MPage({ params }: { params: any }) {
  try {
    const populatesId: Populates[] = await fetchPopularProduct();
    const flatProductId: number[] = populatesId
      .map((product) => product.products)
      .flat();
    const populatest = await fetchProductByIds(flatProductId);
    const Cities: iCity[] = await fetchCities();

    return <MainPage params={params} populates={populatest} Cities={Cities} />;
  } catch (error) {
    console.error('Error in MPage:', error);
    return <div>Error loading page data</div>;
  }
}

const Page = async ({ params }: { params: any }) => {
  return <MPage params={params} />;
};

export default Page;
