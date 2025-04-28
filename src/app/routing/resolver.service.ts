import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Observable<string>> {
  resolve() {
    // Normally you would call an API here
    return of('User Data Loaded');
  }
}
