import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface iCityStore {
  currentCity: string;
  setCurrentCity: (City: string) => void;
}


const useCityStore = create<iCityStore>()(
  devtools((set) => ({
    currentCity: 'Астана',
    setCurrentCity: (currentCity: string) =>
      set({ currentCity }, false, { type: "setCurrentCity" }),
  }))
);

export default useCityStore;
