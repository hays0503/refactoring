import { iCity } from "@/shared/types/city"

export default async function getCities(){
    const Cities:iCity[] = await (await fetch("http://pimenov.kz/api/v1/citys/")).json()
    return Cities
}