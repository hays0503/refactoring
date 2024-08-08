"use server";
import { iCity } from "@/shared/types/city";
import getCities from "@/shared/api/v1/getCities";
import ReviewsPage from "@/_pages/ReviewsPage/ui/ReviewsPage";

export default async function Page({ params }: { params: any }) {

  const Cities = await getCities(); 

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

  return (
    <ReviewsPage params={params} Cities={Cities} currentCity={currentCity} />
  );
}
