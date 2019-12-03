import { observable, action } from "mobx";
import { ChildModule } from "./ChildModule";
import { ModuleBase } from "./ModuleBase";

/**
 * Mobxのカウンターストア
 */
export class CounterModule extends ModuleBase {
  /**
   * カウント
   * (Vuexのstate)
   */
  @observable count = 0;

  /**
   * カウントを増やす
   * (VuexのMutation)
   */
  @action.bound
  increment() {
    this.count += 1;
  }

  /**
   * カウントをへらす
   * (VuexのMutation)
   */
  @action.bound
  decrement() {
    this.count -= 1;
  }

  /**
   * 下の階層にStoreを登録したいときはnewすれば良い
   * VuexのModule相当の機能
   */
  childModule = new ChildModule(this.rootStore, this);
}
