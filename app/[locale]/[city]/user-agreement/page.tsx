"use server";

import { UserAgreementPage } from "@/_pages/UserAgreementPage";
import getCities from "@/shared/api/v1/getCities";

export default async function Page({ params }: { params: any }) {

  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return <UserAgreementPage params={params} Cities={Cities} currentCity={currentCity} />;
}
