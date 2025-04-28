import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should add Authorization header to requests', () => {
        const mockResponse = { message: 'success' };

        // Make an HTTP request to trigger the interceptor
        httpClient.get('/test-endpoint').subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        // Expect the HTTP request to include the Authorization header
        const req = httpMock.expectOne('/test-endpoint');
        expect(req.request.headers.has('Authorization')).toBeTrue();
        expect(req.request.headers.get('Authorization')).toBe('Bearer some-token');
        req.flush(mockResponse); // Respond with a mock success
    });

    afterEach(() => {
        httpMock.verify(); // Ensures there are no outstanding requests
    });
});
