import { observable, action, computed } from "mobx"
import { BaseStore } from "./Base/BaseStore"
import { BaseState } from "./Base/BaseState"
import { Store2 } from "./store"
import { BaseActions } from "./Base/BaseActions"
import { ChildStore2 } from "./ChildStore2"

export class CounterStore2 extends BaseStore {
    state = new States(this.store)
    actions = new Actions(this.store, this)
    childStore = new ChildStore2(this.store)
}

class States extends BaseState {
    @observable count = 0

    @computed
    get doubleCount2(){
        return this.count * 2
    }
}

class Actions extends BaseActions {
    private self: CounterStore2
    constructor(store: Store2, self: CounterStore2){
        super(store)
        this.self = self
    }

    @action
    increment(){
        this.self.state.count++
    }

    @action
    decrement(){
        this.self.state.count--
    }

}