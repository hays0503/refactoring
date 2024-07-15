import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface iThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<iThemeStore>()(
  devtools((set,get) => ({
    isDarkMode: false,
    toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }, false, { type: "Change theme" }),
  }))
);

export default useThemeStore;