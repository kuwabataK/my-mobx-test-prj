import { Store } from "./store";

type ValueOf<T> = T[keyof T];
export abstract class BaseStore {
  /**
   * 各Storeの中で root storeにアクセスするためのメンバ
   * これを使うことで、VuexのrootGettersや rootActionのように、Store内で別のStoreにアクセスすることができます
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
    let res = {};
    Object.getOwnPropertyNames((this as any)["__proto__"]).forEach(key => {
      if (typeof (this as any)[key] === "function") {
        (res as any)[key] = (...args: any) => (this as any)[key](...args);
      }
    });
    return res as Omit<
      this,
      "mapActions" | "mapState" | 'mapStore' | ValueOf<{ [K in keyof this]: this[K] extends Function ? "" : K }>
    >;
  }

  /**
   * このストアに定義された変数とgetterの一覧を返します。VuexのmapStateとmapGettersを合わせたような機能を持っています。
   * 以下のように使えます
   *
   * <pre><code>
   *
   * const { count } = store.counterStore.mapState()
   *
   * return <div>{count}</div>
   *
   * </code></pre>
   *
   * ただし、プリミティブな値を利用する場合には、mapStateを呼び出すコンポーネント全体をmobx-react#observer()関数でラップしてください
   * ラップしないと変更が検知されません
   * 
   * また、返り値をTypeScriptの型で縛っているだけなので、実際にはthisを返すだけです
   *
   * @return object メソッド以外の変数を抽出したMap
   *
   */
  mapState() {
    return this as Omit<this, ValueOf<{ [K in keyof this]: this[K] extends Function ? K : this[K] extends BaseStore ? K : "" }>>;
  }

  /**
   * このストアの下に定義されたStoreの一覧を返します。
   * 以下のように使えます
   *
   * <pre><code>
   *
   * const { childStore } = store.counterStore.mapStores()
   *
   * return <div>{count}</div>
   *
   * </code></pre>
   * 
   * また、返り値をTypeScriptの型で縛っているだけなので、実際にはthisを返すだけです
   * 
   * @return object Storeのみ抽出したMap
   *
   */
  mapStore() {
    return this as Omit<this, ValueOf<{ [K in keyof this]: this[K] extends BaseStore ? "" : K }>>;
  }
}
