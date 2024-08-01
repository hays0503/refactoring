"use server";
import { iCity } from "@/shared/types/city";
import { AboutOurGuaranteesPage } from "@/_pages/AboutOurGuaranteesPage";


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

export default async function AboutOurGuaranteesPageProvider({
  params,
}: {
  params: any;
}) {

  const Cities: iCity[] = await fetchCities();

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";
  return <AboutOurGuaranteesPage params={params} Cities={Cities} currentCity={currentCity} />;
}
