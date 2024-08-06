"use server";
import { ContactsPage } from "@/_pages/ContactsPage";
import getCities from "@/shared/api/v1/getCities";

export default async function ContactsPageProvider({
  params,
}: {
  params: any;
}) {
  
  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";
  return <ContactsPage params={params} Cities={Cities} currentCity={currentCity} />;
}
