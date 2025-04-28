// app.component.ts
import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="selected-menu" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/user" routerLinkActive="selected-menu" #route="routerLinkActive">User {{ route.isActive ? 'active' : '' }}</a>
      <a routerLink="/login" routerLinkActive="selected-menu">Login</a>
      <a routerLink="/page/1" routerLinkActive="selected-menu">Page</a>
    </nav>
    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.sass'],  // Reference to the Sass file
})
export class AppComponent {}
