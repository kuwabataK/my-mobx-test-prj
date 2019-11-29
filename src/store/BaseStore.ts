import { Store } from "./store";

export abstract class BaseStore {
  /**
   * 各Storeの中で root storeにアクセスするためのメンバ
   * これを使うことで、rootGettersや rootActionを代替することができる
   **/
  protected store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  /**
   * このストアに定義されたメソッドの一覧を返します。
   * ここで取得したメソッドはコンポーネントの中で、関数にラップすることなく呼び出せるようになります。
   * 例えば以下のように使えます
   *
   * <pre><code>
   *
   * const { increment } = store.counterStore.mapActions()
   *
   * return <button onClock={increment}></button>
   *
   * </code></pre>
   *
   * mapActionsを使わずに展開した関数はthisの参照が壊れてしまうので、うまく動かない場合があります。
   * 例えば以下のようなコードはうまく動きません
   *
   * <pre><code>
   *
   * const { increment } = store.counterStore
   *
   * return <button onClock={increment}></button>
   *
   * </code></pre>
   *
   * また、メソッド以外のメンバは取得できません、すべてundefinedになります
   *
   * @return object メソッドのみを抽出したMap
   *
   */
  mapActions() {
    let res: Partial<
      { [K in keyof this]: this[K] extends Function ? this[K] : undefined }
    > = {};
    Object.getOwnPropertyNames((this as any)["__proto__"]).forEach(key => {
      if (typeof (this as any)[key] === "function") {
        (res as any)[key] = (...args: any) => (this as any)[key](...args);
      }
    });
    return res as Omit<
      { [K in keyof this]: this[K] extends Function ? this[K] : undefined },
      "mapActions"
    >;
  }
}
