import {Injectable} from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";
import {Module, MODULES, OrderedModule} from "./modules";

@Injectable()
export class ModuleService {
  private addedModule = new Set<string>();

  addModule(name: string) {
    this.addedModule.add(name);
  }

  hasAddedModule(name: string) {
    return this.addedModule.has(name);
  }

  private getOrder(imports: string[], orderedModule: OrderedModule[]) {
    const founds: number[] = orderedModule
      .filter(m => imports.includes(m.name))
      .map(m => m.order) as number [];

    if(founds.length == 0){
      return 1;
    }

    return Math.max(...founds) + 1;
  }

  getOrderedModules(module: Module, orderedModule: OrderedModule[]): OrderedModule[] {

    const ordered = {
      ...module,
      order: this.getOrder(module.imports, orderedModule),
    }

    return [
      ...orderedModule,
      ordered
    ].sort((a, b) => a.order - b.order);
  }

  loadModule(): Observable<Module[]> {
    return of(MODULES).pipe(
      tap(() => console.log("loadModule#isLoading")),
      delay(1000),
      tap(() => console.log("loadModule#loaded")),
    )
  }
}
