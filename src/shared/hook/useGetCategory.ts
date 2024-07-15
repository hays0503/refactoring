import useCategoryStore from "@/_app/store/category";
import { useEffect } from "react";

const useGetCategory = () => {

    const { category, fetchCategories } = useCategoryStore((state) => {
        return {
          category: state.categories,
          fetchCategories: state.fetchCategories,
        };
      });

    useEffect(() => {
    fetchCategories();
    }, [fetchCategories]);

    return category
}

export default useGetCategory;