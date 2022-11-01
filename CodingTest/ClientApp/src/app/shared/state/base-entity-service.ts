import { Observable } from 'rxjs';
import { BaseQuery } from './base-query';
import { EntityStore, EntityState } from '@datorama/akita';
import { tap, delay } from 'rxjs/operators';

export abstract class BaseEntityService<TParams, TView, TResult> {

    constructor(
        protected query: BaseQuery<TView, TParams>,
        protected entityStore: EntityStore<EntityState<TView>, TView>
        ) {
    }

    protected abstract getFromApi(params: TParams): Observable<TResult>;
    protected abstract getFromStore(params: TParams): Observable<TResult>;

    protected selectFromStore(params: TParams): Observable<TView> {
      return this.query.selectData(params).pipe(
        delay(1), // if removed, ui will not update with current data
      );
    }

    reset(): void {
      this.entityStore.remove();
    }

    get(params: TParams): Observable<TResult> {
        return this.toggleLoading(
            () => {
                if (!this.query.hasData(params))
                    return this.getFromApi(params);
                else
                    return this.getFromStore(params);
            }
        );
    }

    toggleLoadingValue(value: boolean): void {
      this.entityStore.setLoading(value);
    }

    private toggleLoading<TResult>(o: () => Observable<TResult>) {
        this.entityStore.setLoading(true);
        return o().pipe(
          tap(() => {
            this.entityStore.setLoading(false);
          })
        );
    }
}
