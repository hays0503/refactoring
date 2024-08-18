import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";
import ifHaveParent from "./ifHaveParent";
import { Category } from "@/shared/types/category";

const findRootCategoryId = (AllCategory: Category[], ChildCategory: Category) => {
    const flatCategories = buildFlatCategory(AllCategory);
    const rootCategory = ifHaveParent(flatCategories, ChildCategory);
    return flatCategories.find((item) => item.id === rootCategory?.id);
  };

export default findRootCategoryId;