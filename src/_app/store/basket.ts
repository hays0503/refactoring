import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

// Интерфейс для корзины
export interface iBasketStore {
  BasketData: Map<number, number>; // Хранит данные корзины в виде Map, где ключ - ID товара, а значение - количество
  uuid4: string; // Уникальный идентификатор пользователя
  addProduct: (id: number, count: number) => void; // Функция для добавления товара
  removeProduct: (id: number, count: number) => void; // Функция для удаления товара
}

// Функция, которая создает состояние корзины
const Basket = (set: any, get: any): iBasketStore => ({
  BasketData: new Map<number, number>(), // Инициализация данных корзины как нового объекта Map
  uuid4: '', // Инициализация uuid4 как пустой строки

  // Функция для добавления товара
  addProduct: (id: number, count: number) => set((state: iBasketStore) => {
    const newBasketData = new Map<number, number>(state.BasketData); // Создаем новый объект Map на основе текущего состояния
    if (newBasketData.has(id)) {
      // Если товар уже есть в корзине, увеличиваем его количество
      newBasketData.set(id, newBasketData.get(id)! + count);
    } else {
      // Если товара нет в корзине, добавляем его с указанным количеством
      newBasketData.set(id, count);
    }
    console.log("newBasketData",newBasketData)
    return { BasketData: newBasketData, uuid4: state.uuid4 }; // Возвращаем обновленные данные корзины
  }),

  // Функция для удаления товара
  removeProduct: (id: number, count: number) => set((state: iBasketStore) => {
    const newBasketData = new Map<number, number>(state.BasketData); // Создаем новый объект Map на основе текущего состояния
    if (newBasketData.has(id)) {
      // Если товар есть в корзине, уменьшаем его количество
      const newCount = newBasketData.get(id)! - count;
      if (newCount > 0) {
        // Если новое количество больше нуля, обновляем количество товара
        newBasketData.set(id, newCount);
      } else {
        // Если новое количество меньше или равно нулю, удаляем товар из корзины
        newBasketData.delete(id);
      }
    } else {
      // Если товара нет в корзине, выводим сообщение об ошибке
      console.log('Такого товара в корзине нет ', id);
    }
    return { BasketData: newBasketData, uuid4: state.uuid4 }; // Возвращаем обновленные данные корзины
  })
});

// Опции для persist middleware
const persistOptions = {
  name: "basket-storage", // Имя для хранения данных корзины в локальном хранилище
  storage: createJSONStorage(() => localStorage), // Указываем хранилище
  serialize: (state: any) => {
    return JSON.stringify({
      ...state,
      state: {
        ...state.state,
        BasketData: Array.from(state.state.BasketData.entries()) // Преобразуем Map в массив
      }
    });
  },
  deserialize: (str: string): any => {
    const state = JSON.parse(str);
    return {
      ...state,
      state: {
        ...state.state,
        BasketData: new Map(state.state.BasketData) // Преобразуем массив обратно в Map
      }
    };
  }
};

// Создаем хранилище корзины с использованием devtools и persist для хранения состояния
let useBasketStore = create<iBasketStore>()(
  devtools(
    persist(Basket, persistOptions)
  )
);

export default useBasketStore; // Экспортируем хук для использования в компонентах
