import { ProductPage } from "@/_pages/ProductPage";
import { iCity } from "@/shared/types/city";

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

const Page = async ({params}:{params:any}) => {
  const Cities:iCity[] = await fetchCities();
  return <ProductPage params={params} Cities={Cities} />
};

export default Page;