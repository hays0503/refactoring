"use server";
import { ProductsInCategory } from "@/_pages/ProductsInCategory";
import getCities from "@/shared/api/v1/getCities";

const Page = async ({params}:{params:any}) => {
  const Cities  = await getCities();
  return <ProductsInCategory params={params} Cities={Cities} />
};

export default Page;