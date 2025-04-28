import {Component} from '@angular/core';
import {MovieListComponent} from "./custom/new-movie.component";

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <!--<app-new-parent></app-new-parent> -->
    <!--<app-parent></app-parent>-->
    <app-new-movie-list></app-new-movie-list>
    <!--<app-resource></app-resource>-->
    <!--<app-movie-list></app-movie-list>-->
  `,
  styles: [],
  imports: [MovieListComponent],
  standalone: true,
})
export class AppComponent {
  title = 'my-app';
}
