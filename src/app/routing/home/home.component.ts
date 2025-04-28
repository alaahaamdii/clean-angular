import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1>Home Page</h1>
    <a routerLink="/user">Go to User Page</a>
  `,
  standalone: true,
  styles: ``,
})
export class HomeComponent {}
