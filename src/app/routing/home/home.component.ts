import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // reactive form: on crée cette représentation manuellement, et on lie ensuite
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';

// reactive form: on crée cette représentation manuellement, et on lie ensuite
// la représentation du formulaire aux inputs en utilisant des directives
@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, NgIf, JsonPipe],
  template: `
    <h1>
      Home Page
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="name">Name:</label>
          <input id="name" formControlName="name" />
          <!--  <div
                                                                *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched"
                                                                style="color: red"
                                                              >
                                                                Name is required and must be at least 3 characters long.
                                                              </div> -->
          @if (userForm.controls.name.hasError('required')) {
            <div>Username is required</div>
          }

          <!-- Use this -->
          @if (nameCtrl.dirty && nameCtrl.hasError('required')) {
            <div>Username is required</div>
          }

          @if (userForm.controls.name.hasError('minlength')) {
            <div>Username should be 3 characters min</div>
          }
        </div>

        <div>
          <label for="email">Email:</label>
          <input id="email" formControlName="email" />
          <div
            *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched"
            style="color: red"
          >
            Please enter a valid email.
          </div>
        </div>

        <button type="submit" [disabled]="userForm.invalid">Submit</button>
      </form>

      <pre>{{ userForm.value | json }}</pre>
      <hr />

      <a routerLink="/user">Go to User Page</a>
    </h1>
  `,
  standalone: true,
  styles: ``,
})
export class HomeComponent {
  private readonly fb = inject(FormBuilder);
  readonly nameCtrl = this.fb.control('', Validators.required, control =>
    this.isLongEnough(control)
  );
  readonly emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
  readonly birthdateCtrl = this.fb.control('', [Validators.required, HomeComponent.isOldEnough]);
  readonly passwordCtrl = this.fb.control('', {
    validators: Validators.required,
  });
  readonly confirmCtrl = this.fb.control('', Validators.required);
  readonly passwordGroup = this.fb.group(
    { password: this.passwordCtrl, confirm: this.confirmCtrl },
    { validators: HomeComponent.passwordMatch, updateOn: 'blur' }
  );

  readonly userForm = this.fb.group({
    name: this.nameCtrl,
    email: this.emailCtrl,
    birthdate: this.birthdateCtrl,
    passwordForm: this.passwordGroup,
  });
  /*  readonly userForm = this.fb.group({
                      name: '',
                      email: ''
                    });*/

  // Create a FormGroup with FormControl
  /*userForm = new FormGroup({
                    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
                    email: new FormControl('', [Validators.required, Validators.email]),
                  });*/

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Getter to easily access form controls
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  static passwordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.value.password;
    const confirm = group.value.confirm;
    return password === confirm ? null : { matchingError: true };
  }

  static isOldEnough(control: AbstractControl): ValidationErrors | null {
    // control is a date input, so we can build the Date from the value
    const birthDatePlus18 = new Date(control.value);
    birthDatePlus18.setFullYear(birthDatePlus18.getFullYear() + 18);
    return birthDatePlus18 < new Date() ? null : { tooYoung: true };
  }

  isLongEnough(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable(observer => {
      setTimeout(() => {
        if (control.value.length < 3) {
          observer.next({ tooShort: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 2000);
    });
  }

 /* readonly passwordStrength = toSignal(
    this.passwordCtrl.valueChanges.pipe(
      // only recompute when the user stops typing for 400ms
      debounceTime(400),
      // only recompute if the new value is different from the last
      distinctUntilChanged(),
      // compute the length of the password
     // map(
        newValue =>
          //the important is the method to compute the password strength
      //this.computePasswordStrength(newValue))
    ),
    { initialValue: 0 }
  );*/
}
