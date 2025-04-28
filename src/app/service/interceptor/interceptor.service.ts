import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest, HttpStatusCode,
} from '@angular/common/http';
import {ErrorHandler, inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

export const SHOULD_NOT_HANDLE_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'Bearer some-token'; // Replace with actual token logic
    console.log('Here is the token!: ', authToken);

    // Store token in localStorage or use it for other logic
    localStorage.setItem('authToken', authToken);

    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });

    return next.handle(authReq);
  }
}

export const exampleAPIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authToken = 'Bearer some-token'; // Replace with actual token logic
  console.log('Here is the token!!: ', authToken);

  // Store token in localStorage or use it for other logic
  localStorage.setItem('authToken', authToken);
  const clone = req.clone({
    setHeaders: { Authorization: `${authToken}` },
  });
  return next(clone);
};


export const errorHandlerResponseInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const errorHandler = inject(ErrorHandler);
  // if there is a context specifically asking for not handling the error, we don't handle it
  if (req.context.get(SHOULD_NOT_HANDLE_ERROR)) {
    return next(req);
  }
  return next(req).pipe(
      // we catch the error
      tap({
        error: (errorResponse: HttpErrorResponse) => {
          // if the status is 401 Unauthorized
          if (errorResponse.status === HttpStatusCode.Unauthorized) {
            // we redirect to login
            router.navigateByUrl('/login');
          } else {
            // else we notify the user
            errorHandler.handleError(errorResponse);
          }
        }
      })
  );
}