import iBasket from "@/shared/types/basket";

export default class BasketApiManipulator {
  public static create(Baskets: iBasket[], uuid4: string, user_id: number) {
    const body = {
      uuid_id: uuid4,
      basket_items: Baskets.map((Basket) => ({
        count: Basket.count,
        price: Basket.price,
        prod_id: Basket.prod_id,
      })),
    };
    const result = fetch("http://127.0.0.1:5001/basket_api/v1/bascket/", {
      headers: {
        accept: "application/json;charset=utf-8",
        'Content-Type': 'application/json;charset=utf-8'        
      },
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  public static update(Baskets: iBasket[], uuid4: string, user_id: number) {
    const body = {
      uuid_id: uuid4,
      basket_items: Baskets.map((Basket) => ({
        count: Basket.count,
        price: Basket.price,
        prod_id: Basket.prod_id,
      })),
    };
    const result = fetch(`http://127.0.0.1:5001/basket_api/v1/bascket/${uuid4}`, {
      headers: {
        accept: "application/json;charset=utf-8",
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
      method: "PATCH",
    });
  }

  public static delete(uuid4: string, user_id: number) {
    const body = {
      uuid_id: uuid4,
      basket_items: [],
    };
    const result = fetch(`http://127.0.0.1:5001/basket_api/v1/bascket/${uuid4}`, {
      headers: {
        accept: "application/json;charset=utf-8",
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
      method: "PATCH",
    });
  }
}
