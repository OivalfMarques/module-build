import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {Module, MODULES, OrderedModule} from "./modules";

@Injectable()
export class ModuleService {


  private modules$ = of(MODULES).pipe(
    tap(() => console.log("loadModule#isLoading")),
    delay(1000),
    tap(() => console.log("loadModule#loaded")),
    shareReplay(1),
  )
  private addedModules$ = new BehaviorSubject<Map<string, Observable<OrderedModule>>>(new Map());

  private hasAddedModule(name: string) {
    return this.addedModules$.value.has(name);
  }

  private getImportOrder(module: Module, modules: Map<string, Observable<OrderedModule>> ): Observable<OrderedModule>{
    const observe = module.imports
      .map(name => modules.get(name))
      .filter(_ => _) as Observable<OrderedModule>[];

    return  combineLatest(observe).pipe(
      map(imported => imported.map(_ => _.order)),
      map(orders => Math.max(...orders) + 1),
      map(order => ({
        ...module,
        order
      } as OrderedModule)),
      startWith({
        ...module,
        order: 1
      }),
    )
  }

  private getOrder(module: Module): Observable<OrderedModule> {
    return this.addedModules$.pipe(
      switchMap(modules => {
        if(module.imports.length > 0){
            return  this.getImportOrder(module, modules);
        }

        return of({
          ...module,
          order: 1
        });
      }),
      shareReplay(1)
    ) as Observable<OrderedModule>
  }

  addModule(m: Module) {
    if (!this.hasAddedModule(m.name)) {
      const orderedModule = this.addedModules$.value;
      orderedModule.set(m.name, this.getOrder(m));
      this.addedModules$.next(orderedModule);
    }
  }

  asObserveOrderedModules() {
    return this.addedModules$.pipe(
      map(modules => Array.from(modules.values())),
      switchMap( modules =>  combineLatest(modules)),
      map(modules => modules.sort((a, b) =>  a.order - b.order))
    )
  }

  loadModules(): Observable<Module[]> {
    return combineLatest([
      this.modules$,
      this.addedModules$,
    ]).pipe(
      map(([modules, addedModules]) => modules.filter(m => !addedModules.has(m.name)))
    )
  }
}
