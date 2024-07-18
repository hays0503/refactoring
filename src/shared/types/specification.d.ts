export interface Specification {
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
