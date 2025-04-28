import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
}

@Injectable({
  providedIn: 'root', //nous avons besoin de "l’enregistrer", pour le rendre disponible à l’injection
})
export class CustomServiceService {
  private readonly apiUrl = 'https://www.freetestapi.com/api/v1/movies';

  constructor(private http: HttpClient) {}

  getHighRatedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl, { observe: 'response' }).pipe(
      tap(response => {
        console.log('Headers:', response.headers);
        console.log('Response:', response);
        console.log('Body:', response.body);
      }),
      map(response => response.body || []), // Ensure we map the response body correctly
      tap(movies => console.log('Fetched Movies:', movies)),
      map(movies => movies.filter(movie => movie.rating > 8)),
      tap(highRated => console.log('High Rated Movies:', highRated)),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return of([]);
      })
    );
  }
}
