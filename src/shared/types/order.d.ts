export default interface IOrder {
    uuid_id: string | null;
    order_status: "NEW" | "INWORK" | "COMPLITED";
    comment: string | null;
    phone_number: string;
    shipping_city: string;
    delivery_address: string | null;
    delivery_type: "DELIVERY" | "PICKUP";
}
