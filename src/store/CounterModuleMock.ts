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

  childModule = new ChildModule(this.rootStore, this as any);
}
