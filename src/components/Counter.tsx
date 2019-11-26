import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/store";

export const Counter = observer(() => {
  // context経由でストアを取得
  const { counterStore } = useStore();

  const incrementOutsideOfAction = () => {
    counterStore.count++; // @actionの外でcountを変更するとerrorが発生する(Vuexのmutation errorと同じ)
  };

  return (
    <div>
      カウンター: {counterStore.count}
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
        <button onClick={incrementOutsideOfAction}>
          Storeの外でカウントを操作する
        </button>
      </p>
    </div>
  );
});
