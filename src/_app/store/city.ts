import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

interface iCityStore {
  currentCity: string;
  setCurrentCity: (City: string) => void;
  missCityConfirm: boolean;
  setMissCityConfirm: (missCity: boolean) => void;
}

const city = (set: any) => ({
  currentCity: "",
  setCurrentCity: (currentCity: string) =>
    set({ currentCity }, false, { type: "setCurrentCity" }),
  missCityConfirm: false,
  setMissCityConfirm: (missCityConfirm: boolean) => set({ missCityConfirm }, false, { type: "setMissCity" }),
});

let useCityStore = create<iCityStore>()(
  devtools(
    persist(city, {
      name: "city-storage",      
    })
  )
);

export default useCityStore;
