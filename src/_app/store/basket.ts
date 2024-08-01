import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

// Интерфейс для корзины
export interface iBasketStore {
  BasketData: Map<number, number>;
  uuid4: string;
  addProduct: (id: number, count: number) => void;
  removeProduct: (id: number, count: number) => void;
}

// Кастомное хранилище для работы с Map
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const { state } = JSON.parse(str);
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
  BasketData: new Map<number, number>(),
  uuid4: '',
  addProduct: (id: number, count: number) => set((state: iBasketStore) => {
    const newBasketData = new Map<number, number>(state.BasketData);
    if (newBasketData.has(id)) {
      newBasketData.set(id, newBasketData.get(id)! + count);
    } else {
      newBasketData.set(id, count);
    }
    return { BasketData: newBasketData, uuid4: state.uuid4 };
  }),
  removeProduct: (id: number, count: number) => set((state: iBasketStore) => {
    const newBasketData = new Map<number, number>(state.BasketData);
    if (newBasketData.has(id)) {
      const newCount = newBasketData.get(id)! - count;
      if (newCount > 0) {
        newBasketData.set(id, newCount);
      } else {
        newBasketData.delete(id);
      }
    } else {
      console.log('Такого товара в корзине нет ', id);
    }
    return { BasketData: newBasketData, uuid4: state.uuid4 };
  }),
});

// Создаем хранилище корзины с использованием devtools и persist для хранения состояния
let useBasketStore = create<iBasketStore>()(
  devtools(
    persist(Basket, persistOptions)
  )
);

export default useBasketStore;