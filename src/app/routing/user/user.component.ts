import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common"; // template form

// template form: on a juste besoin d’ajouter les bonnes
// directives dans le template et le framework s’occupe de créer la représentation du formulaire
@Component({
  selector: 'app-user',
  imports: [RouterLink, FormsModule, NgIf],
  template: `
    <h1>User Page</h1>
    <!-- [ngFormOptions]="{ updateOn: 'blur' }" -->
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <label for="name">Name</label>
      <input id="name" name="name" #name="ngModel" [ngModelOptions]="{ updateOn: 'blur' }" required [(ngModel)]="form.name"/>
      <div *ngIf="form.controls['name']?.invalid && form.controls['name']?.touched">
        Name is required
      </div>
      @if (name.dirty && name.hasError('required')) {
        <div>Username is required</div>
      }

      <label for="email">Email</label>
      <input id="email" name="email" ngModel required email />
      <div *ngIf="form.controls['email']?.invalid && form.controls['email']?.touched">
        Invalid email
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
    <br />
    <a routerLink="/">Go to Home Page</a>
    <hr />
    <a [routerLink]="['/']">Home</a>
  `,
  standalone: true,
  styles: ``,
})
export class UserComponent {
  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.value);
    }
  }
}
