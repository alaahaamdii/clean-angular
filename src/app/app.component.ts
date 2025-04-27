import {Component} from '@angular/core';
import {MovieListComponent} from "./custom/new-movie.component";

//import {ParentComponent} from "./parent/parent.component";

@Component({
  selector: 'app-root',
  // imports: [ParentComponent,NewParentComponent],
  // if standalone component or imports: [HttpClientModule] in AppModule
  imports: [MovieListComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <!--<app-new-parent></app-new-parent> -->
    <!--<app-parent></app-parent>-->
    <app-new-movie-list></app-new-movie-list>
    <!--<app-resource></app-resource>-->
    <!--<app-movie-list></app-movie-list>-->
  `,
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
