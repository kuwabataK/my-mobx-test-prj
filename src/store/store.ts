import { CounterStore } from "./CounterStore";
import { configure } from "mobx";
import React, { useContext } from "react";
import { StoreBase } from "./StoreBase";

configure({ enforceActions: "always" });

export class RootStore extends StoreBase {
  counterStore = new CounterStore(this);
}

export const store = new RootStore(); // Storeのインスタンスを作成
export const storeContext = React.createContext(store); // storeのcontextを作成
export const useStore = () => useContext(storeContext); // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成
