import {observable, action} from 'mobx'

export class CounterStore {
  /**
   * カウント
   */
  @observable count = 0

  /**
   * カウントを増やす
   */
  @action
  increment(){
    this.count += 1
  }

  /**
   * カウントをへらす
   */
  @action
  decrement(){
    this.count -= 1
  }
}
