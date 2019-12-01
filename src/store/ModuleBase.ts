import { RootStore } from "./store";
import { StoreBase } from "./StoreBase";

/**
 * rootStore以外のStoreのベースになるクラスです
 * Storeクラスを作成する際に、これをextendsして使います
 */
export abstract class ModuleBase extends StoreBase {
  /**
   * 各Storeの中で root storeにアクセスするためのメンバ
   * これを使うことで、VuexのrootGettersや rootActionのように、Store内で別のStoreにアクセスすることができます
   **/
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super();
    this.rootStore = rootStore;
  }
}
