/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Observer, observer } from "mobx-react";
import { useStore } from "../store/store";
import { useReaction } from "../util/custom-hooks";

export const Counter = observer(() => {
  // context経由でストアを取得
  const { counterModule: counterStore } = useStore();

  // 以下のuseEffect store.counterStore.countが変化しても発火しない
  useEffect(() => {
    console.log("再レンダリングされたよ！！。でもこのEffectは発火しないよ");
  }, [counterStore.count]);

  // useReactionを使えば変更検知できるようになる
  useReaction(
    () => counterStore.count,
    () => {
      console.log("再レンダリングされたよ！！");
    }
  );

  // mapModules()を使うことで、このストアの下に登録されているStoreの一覧を取得できる
  const { childModule: childStore } = counterStore.mapModules();

  // mapActions()を使うことで、このストアにあるメソッドの一覧を取得することができる
  const { increment } = counterStore.mapActions();

  // mapState()を使うことで、このストアにある変数とgetterの一覧を取得することができる
  const { count } = counterStore.mapState();

  const { superIncrement } = childStore.mapActions();

  const incrementOutsideOfAction = () => {
    counterStore.count++; // @actionの外でcountを変更するとerrorが発生する(Vuexのmutation errorと同じ)
  };

  return (
    <div>
      <Observer>{() => <div>カウンター: {count}</div>}</Observer>
      <Observer>{() => <p>childStoreのカウンター: {childStore.count}</p>}</Observer>
      <Observer>
        {() => (
          <p>childStoreのParentカウンター(一番上と同じ値を参照している): {childStore.parentCnt}</p>
        )}
      </Observer>
      <p>
        <button onClick={() => counterStore.increment()}>カウントを増やす</button>
      </p>
      <p>
        <button onClick={() => counterStore.decrement()}>カウントを減らす</button>
      </p>
      <p>
        <button onClick={() => childStore.increment()}>
          childStoreのincrementメソッドを呼び出す
        </button>
      </p>
      <p>
        <button onClick={() => childStore.parentIncrement()}>
          childStoreのparentIncrementメソッドを呼び出す
        </button>
      </p>
      <p>
        <button onClick={increment}>mapActionsを使ったincrement(動く)</button>
      </p>
      <p>
        <button onClick={() => superIncrement(1, 1)}>
          mapActionsを使ったsuperIncrement(2ずつ増える)
        </button>
      </p>
      <p>
        <button onClick={counterStore.increment}>mapActionsを使わないincrement(@action.boundをつけていれば動く)</button>
      </p>
      <p>
        <button onClick={incrementOutsideOfAction}>Storeの外でカウントを操作する</button>
      </p>
    </div>
  );
});
