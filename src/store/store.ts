import { CounterStore } from "./CounterStore";
import { configure } from "mobx";
import React, { useContext } from "react";

configure({ enforceActions: "always" });

export class Store {
  counterStore = new CounterStore(this);
}

export const store = new Store(); // Storeのインスタンスを作成
export const storeContext = React.createContext(store); // storeのcontextを作成
export const useStore = () => useContext(storeContext); // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成
