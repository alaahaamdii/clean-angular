/*
Generated using ng g g guard auth-gard

import { CanActivateFn } from '@angular/router';

export const loggedInGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  // returns `true` if the user is logged in or redirects to the login page
  // note that you can also use `router.createUrlTree()` to build a `UrlTree` with
parameters
  return userService.isLoggedIn() || router.parseUrl('/login');
};


export const authGardGuard: CanActivateFn = (route, state) => {
  return true;
};
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isAuthenticated = true; // This should be replaced with actual authentication logic

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['']); // Redirect to home page if not authenticated
      return false;
    }
  }
}
