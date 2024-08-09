import iBasket from "@/shared/types/basket";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import BasketApiManipulator from "../api/apiBasketApiManipulator";

// Интерфейс для корзины
export interface iBasketStore {
  BasketData: Map<number, iBasket>;
  uuid4: string;  
  version: number;
  addProduct: (id: number, count: number, price: number,city:string) => void;
  updateProduct: (id: number, count: number, price: number,city:string) => void;
  removeProduct: (id: number, count: number, price: number,city:string) => void;
  clearBasket: () => void;
}

// Кастомное хранилище для работы с Map
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const { state } = JSON.parse(str);

    // Если версия не совпадает, удаляем устаревшие данные и возвращаем null
    if (state.version !== 1) {
      localStorage.removeItem(name);
      return null;
    }

    return {
      state: {
        ...state,
        BasketData: new Map(state.BasketData),
      },
    };
  },
  setItem: (name: string, newValue: any) => {
    const str = JSON.stringify({
      state: {
        ...newValue.state,
        BasketData: Array.from(newValue.state.BasketData.entries()),
      },
    });
    localStorage.setItem(name, str);
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

// Опции для persist middleware
const persistOptions = {
  name: "basket-storage",
  storage: customStorage,
};

// Функция, которая создает состояние корзины
const Basket = (set: any, get: any): iBasketStore => ({
  BasketData: new Map<number, iBasket>(),
  uuid4:
    (typeof window !== "undefined" &&
      localStorage.getItem("basket-storage") &&
      JSON.parse(localStorage.getItem("basket-storage")!).state.uuid4) ||
    uuidv4(), // Инициализация uuid4,
  version: 1,
  addProduct: (id: number, count: number, price: number,city:string) =>
    set((state: iBasketStore) => {
      const newBasketData = new Map<number, iBasket>(state.BasketData);
      if (newBasketData.has(id)) {
        let item = newBasketData.get(id);
        if (item) {
          item.count += count; // Увеличиваем количество товара
          item.price = price; // Обновляем цену товара
          item.city = city;
          newBasketData.set(id, item);
          BasketApiManipulator.update(
            Array.from(state.BasketData.values()),
            state.uuid4,
            -1
          );
        }
      } else {
        const item: iBasket = {
          prod_id: id,
          count: count,
          price: price,
          city:city
        };
        if (newBasketData.size === 0) {
          BasketApiManipulator.create(Array.from([item]), state.uuid4, -1);
        } else {
          BasketApiManipulator.update(
            [...Array.from(state.BasketData.values()), item],
            state.uuid4,
            -1
          );
        }
        newBasketData.set(id, item);        
      }
      return {
        BasketData: newBasketData,
        uuid4: state.uuid4,
        version: state.version,
      };
    }),

  updateProduct: (id: number, count: number, price: number,city:string) =>{
    set((state: iBasketStore) => {
      const newBasketData = new Map<number, iBasket>(state.BasketData);
      if (newBasketData.has(id)) {
        let item = newBasketData.get(id);
        if (item) {
          item.count = count; // Обновляем количество товара
          item.price = price;
          item.city = city;
          newBasketData.set(id, item);
          BasketApiManipulator.update(
            Array.from(state.BasketData.values()),
            state.uuid4,
            -1
          );
        }
      } else {
        console.log("Такого товара в корзине нет ", id);
      }
      return {
        BasketData: newBasketData,
        uuid4: state.uuid4, 
    }})
  },
  removeProduct: (id: number, count: number, price: number,city:string) =>
    set((state: iBasketStore) => {
      const newBasketData = new Map<number, iBasket>(state.BasketData);
      if (newBasketData.has(id)) {
        let item = newBasketData.get(id);
        if (item) {
          item.count -= count; // Уменьшаем количество товара
          item.price = price;
          item.city = city;
          if (item.count <= 0) {
            newBasketData.delete(id); // Удаляем товар, если его количество меньше или равно нулю
            BasketApiManipulator.delete(state.uuid4, -1);
          } else {
            newBasketData.set(id, item);
            BasketApiManipulator.update(
              Array.from(state.BasketData.values()),
              state.uuid4,
              -1
            );
          }
        }
      } else {
        console.log("Такого товара в корзине нет ", id);
      }
      return {
        BasketData: newBasketData,
        uuid4: state.uuid4,
        version: state.version,
      };
    }),
  clearBasket: () => set({ uuid4:uuidv4(),BasketData: new Map<number, iBasket>() }),
});

// Создаем хранилище корзины с использованием devtools и persist для хранения состояния
let useBasketStore = create<iBasketStore>()(
  devtools(persist(Basket, persistOptions))
);

export default useBasketStore;
