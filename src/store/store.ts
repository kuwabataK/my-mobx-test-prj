import { CounterStore } from "./CounterStore";
import { configure } from "mobx";
import React, { useContext } from "react";

configure({ enforceActions: 'always' })

class Store {
  counterStore = new CounterStore()
}

export const store = new Store() // Storeのインスタンスを作成
export const storeContext = React.createContext(store)  // storeのcontextを作成
export const useStore = () => useContext(storeContext)  // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成