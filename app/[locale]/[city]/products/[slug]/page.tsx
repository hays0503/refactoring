import { ProductPage } from "@/_pages/ProductPage";
import getCities from "@/shared/api/v1/getCities";

const Page = async ({params}:{params:any}) => {
  const Cities  = await getCities(); 
  return <ProductPage params={params} Cities={Cities} />
};

export default Page;