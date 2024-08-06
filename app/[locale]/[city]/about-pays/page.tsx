"use server";

import { AboutPaysPage } from '@/_pages/AboutPaysPage';
import getCities from '@/shared/api/v1/getCities';
 
export default async function AboutPaysPageProvider({ params }: { params: any }) {
  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return <AboutPaysPage params={params} Cities={Cities} currentCity={currentCity} />;
}