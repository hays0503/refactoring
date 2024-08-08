import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import OrderApiManipulator from "../api/apiOrderApiManipulator";
import IOrder from "@/shared/types/order";


// Интерфейс для хранилища заказов
export interface iOrderStore {
  version: number;
  isOpenModalOrder: boolean;
  order: IOrder | null;
  addOrder: (order: IOrder) => void;
  updateOrder: (order: IOrder) => void;
  toggleModal: () => void;
}

// Кастомное хранилище для работы с объектами и версионированием
const currentVersion = 1;

const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const { state } = JSON.parse(str);
    if (state.version !== currentVersion) {
      localStorage.removeItem(name);
      return null;
    }
    return {
      state: {
        ...state,
      },
    };
  },
  setItem: (name: string, newValue: any) => {
    const str = JSON.stringify({
      state: {
        ...newValue.state,
      },
    });
    localStorage.setItem(name, str);
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

// Опции для persist middleware
const persistOptions = {
  name: "order-storage",
  storage: customStorage,
};

// Функция, которая создает состояние заказа
const Order = (set: any, get: any): iOrderStore => ({
  version: currentVersion,
  order: null,
  isOpenModalOrder: false,
  addOrder: (order: IOrder) =>
    set(() => {
      return { order: order };
    }),
  updateOrder: (order: IOrder) =>
    set(() => {
      return { order: order };
    }),
  toggleModal: () =>
    set((state: iOrderStore) => {
      return { isOpenModalOrder: !state.isOpenModalOrder };
    }),
});

// Создаем хранилище заказов с использованием devtools и persist для хранения состояния
let useOrderStore = create<iOrderStore>()(
  devtools(persist(Order, persistOptions))
);

export default useOrderStore;
