import { MainPage } from "@/_pages/MainPage";
import getCities from "@/shared/api/v1/getCities";
import { revalidateConfig } from "@/shared/config/revalidateConfig";
import { iCity } from "@/shared/types/city";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";

const fetchPopularProduct = async (): Promise<Populates[]> => {
  try {
    const limit = 16;
    const response = await fetch(
      `http://pimenov.kz/api/v1/populates/?limit=${limit}`,
      {
        mode: "cors",
        credentials: "include",
        next: revalidateConfig["api/v1/populates"],
        method: "GET",
        headers: {
          Accept: "application/json;charset=utf-8",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching popular products: ${response.statusText}`
      );
    }
    const data = (await response.json()) as Populates[];
    return data;
  } catch (error) {
    console.error("Error in fetchPopularProduct:\n", error);
    return []; //fetchPopularProduct()
  }
};

const fetchProductByIds = async (ids: number[]): Promise<Products[]> => {
  const url = `http://pimenov.kz/api/v1/products/by_ids/${ids.join(",")}/`;

  try {
    const response = await fetch(url, {
      mode: "cors",
      credentials: "include",
      next: revalidateConfig["/api/v1/products/by_ids"],
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    });

    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Response Text for parsing error:", responseText);
      throw jsonError;
    }
  } catch (error) {
    return []; //fetchProductByIds(ids)
  }
};



async function MPage({ params }: { params: any }) {
  try {
    const populatesId: Populates[] = await fetchPopularProduct();
    const flatProductId: number[] = populatesId
      .map((product) => product.products)
      .flat();
    const Cities  = await getCities();
    if (flatProductId.length !== 0) {
      const populatest = await fetchProductByIds(flatProductId);      
      return (
        <MainPage params={params} populates={populatest} Cities={Cities} />
      );
    }else{      
      return (
        <MainPage params={params} populates={[]} Cities={Cities} />
      );
    }
  } catch (error) {
    console.error("Error in MPage:", error);
    return <div>Error loading page data</div>;
  }
}

const Page = async ({ params }: { params: any }) => {
  return <MPage params={params} />;
};

export default Page;
