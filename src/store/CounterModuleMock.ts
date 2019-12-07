import { ModuleBase } from "./ModuleBase";
import { CounterModule } from "./CounterModule";
import { ChildModule } from "./ChildModule";

export class CounterModuleMock extends ModuleBase implements CounterModule {
  count = 0;

  increment(): void {
    console.log("モックの関数が発火したよ");
  }

  decrement(): void {
    console.log("モックの関数が発火したよ！！！");
  }

  get doubleCnt(): number {
    console.log("モックの関数が発火したよ！！！");
    return 0;
  }

  childModule = new ChildModule(this.rootStore, this as any);
}
