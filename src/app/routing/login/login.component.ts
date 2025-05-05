import {KeyValuePipe, NgFor, NgIf} from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormRecord, NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgFor, KeyValuePipe],
  template: `
    <h1>Login</h1>
    <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
      <div *ngFor="let record of settingsForm.controls | keyvalue">
        <h4>{{ record.key }}</h4>
        <div *ngFor="let control of getArray(record.key).controls; let i = index">
          <input [formControl]="control" />
          <button type="button" (click)="removeItem(record.key, i)">Remove</button>
        </div>
        <input #newItem placeholder="Add item" />
        <button type="button" (click)="addItem(record.key, newItem.value)">Add</button>
      </div>

      <button type="submit">Save</button>
    </form>
    <hr />
    <button (click)="saveAndMoveBackToHome()">Save and Go Home</button>
  `,
  standalone: true,
  styles: ``,
})
export class LoginComponent {
  private readonly router = inject(Router);
  settingsForm: FormRecord<FormArray<FormControl<string>>>;

  constructor(private fb: NonNullableFormBuilder) {
    this.settingsForm = new FormRecord<FormArray<FormControl<string>>>({
      themes: this.fb.array([
        this.fb.control('light'),
        this.fb.control('dark'),
      ]),
      languages: this.fb.array([
        this.fb.control('en'),
        this.fb.control('fr'),
      ]),
    });
  }

  getArray(key: string): FormArray<FormControl<string>> {
    return this.settingsForm.get(key) as FormArray<FormControl<string>>;
  }

  addItem(category: string, value: string) {
    this.getArray(category).push(this.fb.control(value));
  }

  removeItem(category: string, index: number) {
    this.getArray(category).removeAt(index);
  }

  onSubmit() {
    console.log(this.settingsForm.value);
  }

  saveAndMoveBackToHome(): void {
    // ... save logic ...
    this.router.navigate(['']);
  }
}
