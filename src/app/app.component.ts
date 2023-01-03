import {Component, OnInit} from '@angular/core';
import {Module, MODULES, OrderedModule} from "./modules";
import {ModuleService} from "./module.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ModuleService
  ]
})
export class AppComponent implements OnInit{

  modules$: Observable<Module[]> = this.moduleService.loadModules();
  title = 'module-build';
  orderedModules$: Observable<OrderedModule[]> = this.moduleService.asObserveOrderedModules();

  constructor(
    private moduleService: ModuleService
  ) {
  }

  onAddModule(module: Module) {
    this.moduleService.addModule(module)
  }


  ngOnInit(): void {
  }
}
