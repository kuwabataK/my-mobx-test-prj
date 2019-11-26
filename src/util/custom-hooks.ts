/* eslint-disable react-hooks/exhaustive-deps */
import { reaction, IReactionPublic, IReactionOptions } from "mobx";
import React from "react";
import { useDisposable } from "mobx-react-lite";

/**
 * mobxのreactionをラップしたCustomHook
 * @see https://github.com/mobxjs/mobx-react/issues/772
 * 
 * @param staticExpression 監視する変数を返す関数を指定する
 * @param staticEffect 監視対象の変数が変更されたときに実行される処理
 * @param options 
 */
export function useReaction<T>(
  staticExpression: (r: IReactionPublic) => T,
  staticEffect: (arg: T, r: IReactionPublic) => void,
  options?: IReactionOptions
) {
  const expressionRef = React.useRef(staticExpression);
  const effectRef = React.useRef(staticEffect);
  const optionsRef = React.useRef(options);
  return useLiveReaction(
    expressionRef.current,
    effectRef.current,
    optionsRef.current
  );
}

export function useLiveReaction<T>(
  expression: (r: IReactionPublic) => T,
  effect: (arg: T, r: IReactionPublic) => void,
  options?: IReactionOptions
) {
  const expressionRef = React.useRef(expression);
  return useDisposable(
    React.useCallback(() => reaction(expressionRef.current, effect, options), [
      effect,
      options
    ])
  );
}
