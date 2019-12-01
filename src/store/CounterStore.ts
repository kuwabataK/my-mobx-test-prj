import { observable, action } from "mobx";
import { ChildStore } from "./ChildStore";
import { CommonStoreBase } from "./CommonStoreBase";

/**
 * Mobxのカウンターストア
 */
export class CounterStore extends CommonStoreBase {
  /**
   * カウント
   * (Vuexのstate)
   */
  @observable count = 0;

  /**
   * カウントを増やす
   * (VuexのMutation)
   */
  @action
  increment() {
    this.count += 1;
  }

  /**
   * カウントをへらす
   * (VuexのMutation)
   */
  @action
  decrement() {
    this.count -= 1;
  }

  /**
   * 下の階層にStoreを登録したいときはnewすれば良い
   * VuexのModule相当の機能
   */
  childStore = new ChildStore(this.rootStore, this);
}
