import { Store } from "./store";

export abstract class BaseStore {

  /**
   * 各Storeの中で root storeにアクセスするためのメンバ
   * これを使うことで、rootGettersや rootActionを代替することができる
   **/  
  protected store: Store;

  constructor(store: Store) {
    this.store = store;
  }
}
