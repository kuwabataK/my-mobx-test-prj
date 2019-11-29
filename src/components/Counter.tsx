/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Observer, observer } from "mobx-react";
import { useStore } from "../store/store";
import { useReaction } from "../util/custom-hooks";

export const Counter = observer(() => {
  // context経由でストアを取得
  const { counterStore } = useStore();

  // 以下のuseEffect store.counterStore.countが変化しても発火しない
  useEffect(() => {
    console.log("再レンダリングされたよ！！。でもこのEffectは発火しないよ");
  });

  // useReactionを使えば変更検知できるようになる
  useReaction(
    () => counterStore.count,
    () => {
      console.log("再レンダリングされたよ！！");
    }
  );

  const { increment } = counterStore.mapActions();
  const { count } = counterStore.mapGetters();

  const { superIncrement } = counterStore.childStore.mapActions();

  const incrementOutsideOfAction = () => {
    counterStore.count++; // @actionの外でcountを変更するとerrorが発生する(Vuexのmutation errorと同じ)
  };

  return (
    <div>
      <Observer>{() => <div>カウンター: {count}</div>}</Observer>
      <Observer>
        {() => <p>childStoreのカウンター: {counterStore.childStore.count}</p>}
      </Observer>
      <Observer>
        {() => (
          <p>
            childStoreのParentカウンター(一番上と同じ値を参照している):{" "}
            {counterStore.childStore.parentCnt}
          </p>
        )}
      </Observer>
      <p>
        <button onClick={() => counterStore.increment()}>
          カウントを増やす
        </button>
      </p>
      <p>
        <button onClick={() => counterStore.decrement()}>
          カウントを減らす
        </button>
      </p>
      <p>
        <button onClick={() => counterStore.childStore.increment()}>
          childStoreのincrementメソッドを呼び出す
        </button>
      </p>
      <p>
        <button onClick={() => counterStore.childStore.parentIncrement()}>
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
        <button onClick={counterStore.increment}>
          mapActionsを使わないincrement(動かない)
        </button>
      </p>
      <p>
        <button onClick={incrementOutsideOfAction}>
          Storeの外でカウントを操作する
        </button>
      </p>
    </div>
  );
});
