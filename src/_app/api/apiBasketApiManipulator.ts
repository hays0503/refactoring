import iBasket from "@/shared/types/basket";

export default class BasketApiManipulator {
  public static async create(
    Baskets: iBasket[],
    uuid4: string,
    user_id: number
  ) {
    try {
      const body = {
        uuid_id: uuid4,
        basket_items: Baskets.map((Basket: iBasket) => ({
          count: Basket.count,
          price: Basket.price,
          prod_id: Basket.prod_id,
          city: Basket.city,
        })),
      };
      const result = await fetch(
        "http://pimenov.kz:8989/basket_api/v1/bascket/",
        {
          headers: {
            accept: "application/json;charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
          method: "POST",
        }
      );
      return result;
    } catch (error) {
      // Проверяем, если ошибка связана с CORS
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.log(
          "Перехвачена ошибка CORS или сетевая ошибка. Запрос заблокирован."
        );
        alert(
          "Ошибка в api http://pimenov.kz:8989/basket_api/v1/bascket/\n" +
            "Статус код ответа " +
            error
        );
      } else {
        // Логируем остальные ошибки
        console.log("Перехвачена ошибка -", error);
      }
      // Подавление ошибки
      return null; // Или другое значение, если требуется
    }
  }

  public static async update(
    Baskets: iBasket[],
    uuid4: string,
    user_id: number
  ) {
    try {
      const body = {
        uuid_id: uuid4,
        basket_items: Baskets.map((Basket: iBasket) => ({
          count: Basket.count,
          price: Basket.price,
          prod_id: Basket.prod_id,
          city: Basket.city,
        })),
      };
      const result = await fetch(
        `http://pimenov.kz:8989/basket_api/v1/bascket/${uuid4}`,
        {
          headers: {
            accept: "application/json;charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
          method: "PATCH",
          // mode:"same-origin"
        }
      );
      if (!result.ok) {
        console.log(
          "При обновлении корзины произошла ошибка-" + result.statusText
        );
      }

      return result;
    } catch (error) {
      // Проверяем, если ошибка связана с CORS
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.log(
          "Перехвачена ошибка CORS или сетевая ошибка. Запрос заблокирован."
        );
        alert(
          "Ошибка в api http://pimenov.kz:8989/basket_api/v1/bascket/${uuid4}\n" +
            "Статус код ответа " +
            error
        );
      } else {
        // Логируем остальные ошибки
        console.log("Перехвачена ошибка -", error);
      }
      // Подавление ошибки
      return null; // Или другое значение, если требуется
    }
  }

  public static delete(uuid4: string, user_id: number) {
    try {
      const body = {
        uuid_id: uuid4,
        basket_items: [],
      };
      const result = fetch(
        `http://pimenov.kz:8989/basket_api/v1/bascket/${uuid4}`,
        {
          headers: {
            accept: "application/json;charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
          method: "PATCH",
        }
      );
      return result;
    } catch (error) {
      // Проверяем, если ошибка связана с CORS
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.log(
          "Перехвачена ошибка CORS или сетевая ошибка. Запрос заблокирован."
        );
        alert(
          "Ошибка в api http://pimenov.kz:8989/basket_api/v1/bascket/${uuid4}\n" +
            "Статус код ответа " +
            error
        );
      } else {
        // Логируем остальные ошибки
        console.log("Перехвачена ошибка -", error);
      }
      // Подавление ошибки
      return null; // Или другое значение, если требуется
    }
  }

  public static async createOrUpdate(
    Baskets: iBasket[],
    uuid4: string,
    user_id: number
  ) {
    try {
      const body = {
        uuid_id: uuid4,
        basket_items: Baskets.map((Basket: iBasket) => {
          if (Basket.gift_prod_id != null && Basket.gift_prod_id != undefined) {
            return {
              count: Basket.count,
              price: Basket.price,
              prod_id: Basket.prod_id,
              city: Basket.city,
              gift_prod_id: Basket.gift_prod_id,
            };
          } else {
            return {
              count: Basket.count,
              price: Basket.price,
              prod_id: Basket.prod_id,
              city: Basket.city,
            };
          }
        }),
      };
      const result = await fetch(
        "http://pimenov.kz:8989/basket_api/v1/bascket/create_or_update/",
        {
          headers: {
            accept: "application/json;charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
          method: "POST",
        }
      );
      return result;
    } catch (error) {
      // Проверяем, если ошибка связана с CORS
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.log(
          "Перехвачена ошибка CORS или сетевая ошибка. Запрос заблокирован."
        );
        alert(
          "Ошибка в api http://pimenov.kz:8989/basket_api/v1/bascket/create_or_update/\n" +
            "Статус код ответа " +
            error
        );
      } else {
        // Логируем остальные ошибки
        console.log("Перехвачена ошибка -", error);
      }
      // Подавление ошибки
      return null; // Или другое значение, если требуется
    }
  }
}
