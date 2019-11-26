import { BaseStore } from "./BaseStore";
import { computed } from "mobx";

export class ChildStore extends BaseStore {

    /**
     * 親であるcounterStoreのcountの値を返す
     * rootStateやrootGetters相当の機能を提供する
     */
    @computed
    get count(){
        // this.storeをつかうことでstore全体を参照することができる
        return this.store.counterStore.count;
    }

    /**
     * 親であるcounterStoreのincrementを呼び出す
     * rootActionやrootMutation相当の機能を提供する
     */
    increment(){
        // this.storeをつかうことでstore全体を参照することができる
        this.store.counterStore.increment();
    }
}