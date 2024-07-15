import { Product } from './product';

export interface Populates {
    readonly id:        number;
    readonly products:  Product[];
    readonly name_set:  string;
    readonly activ_set: boolean;
}
