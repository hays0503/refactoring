"use server";

import { AboutWhyWePage } from "@/_pages/AboutWhyWePage";
import getCities from "@/shared/api/v1/getCities";

export default async function AboutWhyWePageProvider({
  params,
}: {
  params: any;
}) {
  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return <AboutWhyWePage params={params} Cities={Cities} currentCity={currentCity} />;
}
