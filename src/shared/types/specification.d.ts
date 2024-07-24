

export type Specification  = {
    id:                  number;
    name_specification:  NameSpecification;
    value_specification: ValueSpecification;
    product:             number;
}

export interface NameSpecification {
    id:                 number;
    additional_data:    AdditionalData;
    name_specification: string;
}

export interface AdditionalData {
    EN: string;
    KZ: string;
}

export interface ValueSpecification {
    id:                  number;
    additional_data:     AdditionalData;
    value_specification: string;
}


export type SpecificationNameSpecificationProps = {
    (object:Specification | null,currentLang: "ru" | "en" | "kz" | string): string;
    (object:NameSpecification,currentLang: "ru" | "en" | "kz" | string): string;
};

export type SpecificationValueSpecificationProps = {
    (object:Specification | null,currentLang: "ru" | "en" | "kz" | string): string;
    (object:ValueSpecification,currentLang: "ru" | "en" | "kz" | string): string;
};