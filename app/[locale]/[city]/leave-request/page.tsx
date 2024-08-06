"use server";
import { LeaveRequestPage } from "@/_pages/LeaveRequestPage";
import getCities from "@/shared/api/v1/getCities";

export default async function LeaveRequestPageProvider({
  params,
}: {
  params: any;
}) {
  const Cities  = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return (
    <LeaveRequestPage
      params={params}
      Cities={Cities}
      currentCity={currentCity}
    />
  );
}
