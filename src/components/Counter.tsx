import React from "react"
import { observer } from "mobx-react"
import store from "../store/store"

export const Counter = observer(() => {
  // ここでは簡単のため、storeのインスタンスを直接importしているが、
  // 公式ではContext APIを使ってStoreオブジェクトを渡すことを推奨している
  // (テストなどでMockへの差し替えをやりやすくするため)
  const counterStore = store.counterStore

  const incrementOutsideOfAction = () => {
    counterStore.count++ // @actionの外でcountを変更するとerrorが発生する(Vuexのmutation errorと同じ)
  }

  return <div>
    カウンター: {counterStore.count}
    <p>
      <button onClick={() => counterStore.increment()} >カウントを増やす</button>
    </p>
    <p>
      <button onClick={() => counterStore.decrement()} >カウントを減らす</button>
    </p>
    <p>
      <button onClick={incrementOutsideOfAction} >Storeの外でカウントを操作する</button>
    </p>
  </div>
})
