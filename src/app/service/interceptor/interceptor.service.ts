import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
