"use server";

import { PrivacyPolicyPage } from "@/_pages/PrivacyPolicyPage";
import getCities from "@/shared/api/v1/getCities";

export default async function Page({ params }: { params: any }) {

  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return <PrivacyPolicyPage params={params} Cities={Cities} currentCity={currentCity} />;
}
