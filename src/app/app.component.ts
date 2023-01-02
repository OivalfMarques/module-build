import {Component, OnInit} from '@angular/core';
import {Module, MODULES, OrderedModule} from "./modules";
import {ModuleService} from "./module.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ModuleService
  ]
})
export class AppComponent implements OnInit{


  modules: Module[] = []
  title = 'module-build';

  orderedModules: OrderedModule[] = [];

  constructor(
    private moduleService: ModuleService
  ) {
  }

  onAddModule(name: string) {

  }

  ngOnInit(): void {
    this.moduleService.loadModule().subscribe((modules) => {
      this.modules = modules
    })
  }
}
