import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Example: Add a fake Authorization header
    const authToken = 'Bearer some-token';
      console.log('Here is the token: ', authToken);
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });

    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }

  ngOnInit() {
    console.log('Interceptor initialized');
  }
}
