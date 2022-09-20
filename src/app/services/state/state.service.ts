import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

export class StateService<T> {
  private state$: BehaviorSubject<T>;
  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialStete: T) {
    this.state$ = new BehaviorSubject<T>(initialStete);    
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState
    })
  }
}