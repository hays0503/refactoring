import { Products } from "./products";

export interface ProductsDetail {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number };
    readonly average_rating:    number;
    readonly reviews_count:     number;
    readonly category:          Category;
    readonly brand:             Brand;
    readonly present:           Present[];
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_product:      string;
    readonly related_product:   Products[];
    readonly list_url_to_image: string[];
}

export interface AdditionalData {
    readonly EN: string;
    readonly KZ: string;
}

export interface Brand {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly name_brand:      string;
}

export interface Category {
    readonly id:                number;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_category:     string;
    readonly lft:               number;
    readonly rght:              number;
    readonly tree_id:           number;
    readonly level:             number;
    readonly parent:            number;
    readonly list_url_to_image: any[];
    readonly list_url_to_baner: any[];
}

export interface Present {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number };
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_product:      string;
    readonly category:          number;
    readonly brand:             number;
    readonly related_product:   number[];
    readonly present:           number[];
    readonly list_url_to_image: string[];
}

export interface TagProd {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
}
