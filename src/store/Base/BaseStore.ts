import { Store2 } from "../store";

export abstract class BaseStore {
  /**
   * 各Storeの中で root storeにアクセスするためのメンバ
   * これを使うことで、rootGettersや rootActionを代替することができる
   **/
  protected store: Store2;
  actions: any;
  state: any;

  constructor(store: Store2) {
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
  mapActions(): this["actions"] {
    let res = {};
    Object.getOwnPropertyNames(this.actions["__proto__"]).forEach(key => {
      if (typeof this.actions[key] === "function") {
        (res as any)[key] = (...args: any) => this.actions[key](...args);
      }
    });
    return res;
  }

  /**
   * このストアに定義された変数とgetterの一覧を返します。VuexのmapStateとmapGettersを合わせたような機能を持っています。
   * また実装の関係上、子ストアも出力されてしまいます。
   * 以下のように使えます
   *
   * <pre><code>
   *
   * const { count } = store.counterStore.mapGetters()
   *
   * return <div>{count}</div>
   *
   * </code></pre>
   *
   * ただし、プリミティブな値を利用する場合には、mapGettersを呼び出すコンポーネント全体をmobx-react#observer()関数でラップしてください
   * ラップしないと変更が検知されません
   *
   * また、メソッドは取得できません、すべてundefinedになります。
   *
   * @return object メソッド以外の変数を抽出したMap
   *
   */
  mapState(): this['state'] {
    let res = {};
    Object.getOwnPropertyNames(this.state["__proto__"]).forEach(key => {
      if (typeof this.state[key] !== "function") {
        (res as any)[key] = this.state[key];
      }
    });
    return res 
  }
}
