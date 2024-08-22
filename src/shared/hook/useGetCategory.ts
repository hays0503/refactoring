import useCategoryStore from "@/_app/store/category";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

const useGetCategory = () => {
  const [category, fetchCategories] = useCategoryStore((state) => [
    state.categories,
    state.fetchCategories,
  ],shallow);

  useEffect(() => {
    fetchCategories();
  }, []);

  return category;
};

export default useGetCategory;
