import { Brands } from "../types/brend";
import { Category } from "../types/category";
import { iDescription } from "../types/descriptionProduct";
import { Products } from "../types/products";
import { ProductsDetail } from "../types/productsDetail";
import { Specification } from "../types/specification";

const selectDataByLangCategory = (
  object: Category | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
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
};

const selectDataByLangBrands = (object:Brands, currentLang:"ru" | "en" | "kz" | string) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_brand;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return object.name_brand;
  }
}

const selectDataByLangProducts = (
  object: ProductsDetail | Products | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
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
};

const selectDataByLangDescriptionTitle = (
  object: iDescription | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.title_description;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return object.title_description;
  }
};

const selectDataByLangDescriptionBody = (
  object: iDescription | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.body_description;
    case "en":
      return object.additional_data_to_desc.EN;
    case "kz":
      return object.additional_data_to_desc.KZ;
    default:
      return object.body_description;
  }
};

const selectDataByLangNameSpecification = (
  object: Specification | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_specification.name_specification;
    case "en":
      return object.name_specification.additional_data.EN;
    case "kz":
      return object.name_specification.additional_data.KZ;
    default:
      return object.name_specification.name_specification;
  }
};

const selectDataByLangValueSpecification = (
  object: Specification | null,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.value_specification.value_specification;
    case "en":
      return object.value_specification.additional_data.EN;
    case "kz":
      return object.value_specification.additional_data.KZ;
    default:
      return object.value_specification.value_specification;
  }
};

export {
  selectDataByLangCategory,
  selectDataByLangProducts,
  selectDataByLangDescriptionTitle,
  selectDataByLangDescriptionBody,
  selectDataByLangNameSpecification,
  selectDataByLangValueSpecification,
  selectDataByLangBrands,
};
