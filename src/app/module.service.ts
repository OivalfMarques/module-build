import {Injectable} from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";
import {Module, MODULES} from "./modules";

@Injectable()
export class ModuleService {

  loadModule() : Observable<Module[]> {
    return  of(MODULES).pipe(
      tap(() => console.log("loadModule#isLoading")),
      delay(1000),
      tap(() => console.log("loadModule#loaded")),
    )
  }
}
