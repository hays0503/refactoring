import IOrder from "@/shared/types/order";

export default class OrderApiManipulator {
  public static create(Order: IOrder): Promise<boolean> {
    const result = fetch("http://pimenov.kz:8989/basket_api/v1/order/", {
      headers: {
        accept: "application/json;charset=utf-8",
        'Content-Type': 'application/json;charset=utf-8'        
      },
      body: JSON.stringify(Order),
      method: "POST",
    });

    return result.then((data)=>{return data.status===201})
  }
}
