import { CounterStore } from "./CounterStore";
import { configure } from "mobx";
import React, { useContext } from "react";
import { CounterStore2 } from "./CounterStore2";

configure({ enforceActions: "always" });

export class Store {
  counterStore = new CounterStore(this);
}

export const store = new Store(); // Storeのインスタンスを作成
export const storeContext = React.createContext(store); // storeのcontextを作成
export const useStore = () => useContext(storeContext); // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成

export class Store2 {
  counterStore = new CounterStore2(this);
}

export const store2 = new Store2(); // Storeのインスタンスを作成
export const storeContext2 = React.createContext(store2); // storeのcontextを作成
export const useStore2 = () => useContext(storeContext2); // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成