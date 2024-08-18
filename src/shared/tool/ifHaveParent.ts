import { Category } from "@/shared/types/category";

function ifHaveParent(AllCategory: Category[], data: Category) {
    if (data.parent !== null) {
      const parent = AllCategory.find((item) => item.id === data.parent);
      if (parent) {
        return ifHaveParent(AllCategory, parent);
      }
      return null;
    }
    return data;
  }

export default ifHaveParent;