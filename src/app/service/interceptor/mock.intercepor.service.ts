import { Injectable } from '@angular/core';
import { AuthInterceptor } from './interceptor.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ManualInterceptorTriggerService {
    constructor(private authInterceptor: AuthInterceptor) {}

    // This method will manually trigger the interceptor
    triggerInterceptor(): void {
        const mockRequest = new HttpRequest('GET', 'https://example.com', {
            headers: new HttpHeaders(),
        });

        const mockHttpHandler: HttpHandler = {
            handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
                // Mocking the HTTP response with a simple observable
                return new Observable<HttpEvent<any>>((observer) => {
                    observer.next({} as HttpEvent<any>);
                    observer.complete();
                });
            },
        };

        // Manually call the interceptor
        this.authInterceptor
            .intercept(mockRequest, mockHttpHandler)
            .subscribe(() => {
                console.log('Interceptor triggered successfully');
            });
    }
}
