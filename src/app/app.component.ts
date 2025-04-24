import { Component } from '@angular/core';
import {NewParentComponent} from "./parent/new-parent.component";

@Component({
  selector: 'app-root',
  imports: [NewParentComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <app-new-parent></app-new-parent>
  `,
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
