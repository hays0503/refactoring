import { Category } from "@/shared/types/category";
import { createWithEqualityFn  } from 'zustand/traditional'
import { devtools } from "zustand/middleware";
import { revalidateConfig } from "@/shared/config/revalidateConfig";

interface iCategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;

  categoryTab: Category[];
  setCategoryTab: (categories: Category[]) => void;

  currentCategories: Category;
  setCurrentCategories: (categori: Category) => void;

  fetchCategories: () => void;

  categoryBanner: string[];
  setCategoryBanner: (categoryBanner: string[]) => void;
}

function initialCategories(): Promise<Category[]> {
  const data = fetch("/api/v1/category", {
    next: revalidateConfig["api/v1/category"],
  })
    .then((res) => res.json())
    .then((data: Category[]) => {
      return data;
    });

  return data;
}

const useCategoryStore = createWithEqualityFn<iCategoryStore>()(
  devtools((set) => ({
    categories: [],

    currentCategories: {} as Category,

    categoryTab: [],

    categoryBanner: [],

    fetchCategories: () =>
      initialCategories().then((data) =>
        set(
          {
            categories: data,
            // currentCategories: data[0],
            categoryTab: data[0]?.children,
            categoryBanner: data[0]?.list_url_to_baner,
          },
          false,
          {
            type: "fetchCategories",
          }
        )
      ),

    setCategories: (categories: Category[]) =>
      set({ categories }, false, { type: "setCategories" }),

    setCategoryTab: (categoryTab: Category[]) =>
      set({ categoryTab }, false, { type: "setCategoryTab" }),

    setCurrentCategories: (categori: Category) =>
      set({ currentCategories: categori }, false, {
        type: "setCurrentCategories",
      }),

    setCategoryBanner: (categoryBanner: string[]) =>
      set({ categoryBanner }, false, { type: "setCategoryBanner" }),
  }))
);

export default useCategoryStore;
