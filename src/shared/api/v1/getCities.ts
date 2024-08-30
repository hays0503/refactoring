import { revalidateConfig } from "@/shared/config/revalidateConfig"
import { iCity } from "@/shared/types/city"

export default async function getCities(){
    const Cities:iCity[] = await (await fetch("http://pimenov.kz/api/v1/citys/",{
        next: revalidateConfig["/api/v1/citys"]
    })).json()
    return Cities
}