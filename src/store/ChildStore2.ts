import { observable, action, computed } from "mobx"
import { BaseStore } from "./Base/BaseStore"
import { BaseState } from "./Base/BaseState"
import { Store2 } from "./store"
import { BaseActions } from "./Base/BaseActions"

export class ChildStore2 extends BaseStore {
    state = new States(this.store)
    actions = new Actions(this.store, this)
}

class States extends BaseState {
    @observable count = 0

    @computed
    get parentCnt(){
        return this.store.counterStore.state.count
    }
}

class Actions extends BaseActions {
    private self: ChildStore2
    constructor(store: Store2, self: ChildStore2){
        super(store)
        this.self = self
    }

    @action
    increment(){
        this.self.state.count++
    }

    @action
    parentIncrement(){
        this.store.counterStore.state.count++
    }

    @action
    superIncrement(num: number,num2:number){
        return this.self.state.count = num + num2 + this.self.state.count
    }

}