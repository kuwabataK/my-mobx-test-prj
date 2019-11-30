import { Store2 } from "../store"

export class BaseActions {
    protected store: Store2
    constructor(store: Store2){
        this.store = store
    }
}