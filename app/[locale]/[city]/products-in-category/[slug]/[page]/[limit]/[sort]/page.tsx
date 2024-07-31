"use client";
import { ProductsInCategory } from "@/_pages/ProductsInCategory";
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
  return <ProductsInCategory params={params} Cities={Cities} />
};

export default Page;