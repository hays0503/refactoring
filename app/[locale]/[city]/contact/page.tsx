"use server";
import { ContactsPage } from "@/_pages/ContactsPage";
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

export default async function ContactsPageProvider({
  params,
}: {
  params: any;
}) {
  
  const Cities: iCity[] = await fetchCities();

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";
  return <ContactsPage params={params} Cities={Cities} currentCity={currentCity} />;
}
