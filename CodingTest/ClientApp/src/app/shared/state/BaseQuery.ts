import { EntityState, Query, QueryEntity } from "@datorama/akita";
import { filter } from 'rxjs/operators';

export abstract class BaseQuery<TView, TParams> extends QueryEntity<EntityState<TView>, TView> {
    selectData(params: TParams) {
        const key = JSON.stringify(params);
        return this.selectEntity(key).pipe(
            filter(x => !!x)
        )
    }

    selectDataNullable(params: TParams) {
        const key = JSON.stringify(params);
        return this.selectEntity(key);
    }

    hasData(params: TParams) {
        const key = JSON.stringify(params);
        return this.hasEntity(key);
    }
}

export abstract class BaseStateQuery<TState> extends Query<TState> {
  getStore(): TState {
    return this.store.getValue();
  }
}
