import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  template: `
    <h1>User Page</h1>
    <a routerLink="/">Go to Home Page</a>
    <hr />
    <a [routerLink]="['/']">Home</a>
  `,
  standalone: true,
  styles: ``,
})
export class UserComponent {}
