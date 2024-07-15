export interface Products {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number };
    readonly average_rating:    number | null;
    readonly reviews_count:     number;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_product:      string;
    readonly category:          number;
    readonly brand:             number;
    readonly related_product:   number[];
    readonly present:           number[];
    readonly list_url_to_image: string[];
}

export interface AdditionalData {
    readonly EN: string;
    readonly KZ: string;
}

export interface TagProd {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
}
