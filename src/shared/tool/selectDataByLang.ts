import { Category } from "../types/category";
import { Products } from "../types/products";

const selectDataByLangCategory = (object: Category|null, currentLang: "ru" | "en" | "kz" | string) => {
    if(!object) return ""
    switch (currentLang) {
      case "ru":
        return object.name_category;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return object.name_category;
    }
}

const selectDataByLangProducts = (object: Products|null, currentLang: "ru" | "en" | "kz" | string) => {
    if(!object) return ""
    switch (currentLang) {
      case "ru":
        return object.name_product;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return object.name_product;
    }
  }


export {
    selectDataByLangCategory,
    selectDataByLangProducts
};