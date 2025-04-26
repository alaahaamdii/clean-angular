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
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      tap(movies => console.log('Fetched Movies:', movies)), // Log the full list
      map(movies => movies.filter(movie => movie.rating > 8)), // Filter movies with rating > 8
      tap(highRated => console.log('High Rated Movies:', highRated)), // Log filtered list
      catchError(error => {
        console.error('Error fetching movies:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
