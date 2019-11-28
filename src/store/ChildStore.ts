import { BaseStore } from "./BaseStore";
import { computed, observable, action } from "mobx";

export class ChildStore extends BaseStore {
  /**
   *  カウント
   */
  @observable count = 0;

  /**
   * 親であるcounterStoreのcountの値を返す
   * rootStateやrootGetters相当の機能を提供する
   */
  @computed
  get parentCnt() {
    console.log("parentCntが発火したよ");
    // this.storeをつかうことでstore全体を参照することができる
    return this.store.counterStore.count;
  }

  /**
   * カウントを増やす
   */
  @action
  increment() {
    this.count += 1;
  }

  /**
   * 親であるcounterStoreのincrementを呼び出す
   * rootActionやrootMutation相当の機能を提供する
   */
  parentIncrement() {
    // this.storeをつかうことでstore全体を参照することができる
    this.store.counterStore.increment();
  }
}
