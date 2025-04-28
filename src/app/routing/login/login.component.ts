import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
    <h1>Login</h1>
    <button (click)="saveAndMoveBackToHome()">Save and Go Home</button>
  `,
  standalone: true,
  styles: ``,
})
export class LoginComponent {
  private readonly router = inject(Router);

  saveAndMoveBackToHome(): void {
    // ... save logic ...
    this.router.navigate(['']);
  }
}
