import { Component } from '@angular/core';
import { NewParentComponent } from './parent/new-parent.component';
import { ResourceComponent } from './custom/newer-movie.component';

//import {ParentComponent} from "./parent/parent.component";

@Component({
  selector: 'app-root',
  // imports: [ParentComponent,NewParentComponent],
  // if standalone component or imports: [HttpClientModule] in AppModule
  imports: [NewParentComponent, ResourceComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-new-parent></app-new-parent>
    <!--<app-parent></app-parent>-->
    <!--<app-new-movie-list></app-new-movie-list>-->
    <app-resource></app-resource>  
  `,
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
