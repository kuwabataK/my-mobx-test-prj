import { CounterModule } from "./CounterModule";
import { configure } from "mobx";
import React, { useContext } from "react";
import { StoreBase } from "./StoreBase";
import { CounterModuleMock } from "./CounterModuleMock";

configure({ enforceActions: "always" });

export class RootStore extends StoreBase {
  counterModule = new CounterModule(this); // counterModuleを登録
  counterModule_mock = new CounterModuleMock(this); // counterModuleのMockを登録
}

export const store = new RootStore(); // Storeのインスタンスを作成
export const storeContext = React.createContext(store); // storeのcontextを作成
export const useStore = () => useContext(storeContext); // コンポーネントでstoreを簡単に読み込むためのカスタムフックを作成
