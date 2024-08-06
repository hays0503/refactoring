"use server";
import { AboutOurGuaranteesPage } from "@/_pages/AboutOurGuaranteesPage";
import getCities from "@/shared/api/v1/getCities";
 
export default async function AboutOurGuaranteesPageProvider({
  params,
}: {
  params: any;
}) {
  const Cities  = await getCities(); 
  
  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";
  return <AboutOurGuaranteesPage params={params} Cities={Cities} currentCity={currentCity} />;
}
