import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  module = [
    {
      name: 'utilities',
      imports:  []
    },
    {
      name: 'table',
      imports:  [
        'utilities'
      ]
    }
  ]
  title = 'module-build';

  orderedModule: {name:string, imports: string [], order?: number}[] = this.module;

  onAddModule(name: string) {

  }
}
