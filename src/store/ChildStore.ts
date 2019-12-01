import { computed, observable, action } from "mobx";
import { RootStore } from "./store";
import { CounterStore } from "./CounterStore";
import { CommonStoreBase } from "./CommonStoreBase";

export class ChildStore extends CommonStoreBase {
  /**
   * 親であるcounterStore
   */
  private counterStore: CounterStore;

  constructor(store: RootStore, counterStore: CounterStore) {
    super(store);
    // コンストラクタでcounterStoreの情報を要求することで、
    // このストアが親であるcounterStoreの実装に依存していることを明示的に示すことができる
    // this.storeを参照すると、store全体に依存してしまうので、こちらを使うほうがよりよい
    this.counterStore = counterStore;
  }

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
    // this.counterStoreを使うことで親のStoreを参照することができる
    // こちらを使うほうが、this.rootStoreを参照するより良い
    return this.counterStore.count;
  }

  /**
   * カウントを増やす
   */
  @action
  increment() {
    this.count += 1;
  }

  @action
  superIncrement(num1: number, num2: number) {
    return (this.count = num1 + num2 + this.count);
  }

  /**
   * 親であるcounterStoreのincrementを呼び出す
   * rootActionやrootMutation相当の機能を提供する
   */
  parentIncrement() {
    // this.rootStoreをつかうことでstore全体を参照することができる
    // 例えばmasterデータやログインIDなど、アプリ全体で一意な値を他のStoreから取得する際に使用する
    this.rootStore.counterStore.increment();
  }
}
