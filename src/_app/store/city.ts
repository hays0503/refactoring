import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

interface iCityStore {
  currentCity: string;
  setCurrentCity: (City: string) => void;
}

const city = (set: any) => ({
  currentCity: "",
  setCurrentCity: (currentCity: string) =>
    set({ currentCity }, false, { type: "setCurrentCity" }),
});

let useCityStore = create<iCityStore>()(
  devtools(
    persist(city, {
      name: "city-storage",      
    })
  )
);

export default useCityStore;
