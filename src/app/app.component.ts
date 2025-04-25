import { Component } from '@angular/core';
//import {NewParentComponent} from "./parent/new-parent.component";
import {ParentComponent} from "./parent/parent.component";

@Component({
  selector: 'app-root',
//  imports: [NewParentComponent],
  imports: [ParentComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>
<!-- <app-new-parent></app-new-parent>-->
    <app-parent></app-parent>
  `,
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
