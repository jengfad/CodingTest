import { Store } from "@datorama/akita";

export abstract class BaseStateService<TState> {
    constructor(
      protected store: Store<TState>
    ) {}

    updateStore(value: TState): void {
      this.store.update(value);
    }
}
