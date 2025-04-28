import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomServiceService, Movie } from '../service/custom-service.service';

@Component({
  selector: 'app-new-movie-list',
  template: `
    <!--<button (click)="getTodos()">Trigger Interceptor</button>-->

    <button (click)="getTodos()">Trigger Interceptor</button>
    <h2>High Rated Movies (rating > 8)</h2>
    @if (isLoading()) {
      <div>Loading movies...</div>
    } @else {
      <ul>
        @for (movie of movies(); track movie.id) {
          <li>{{ movie.title }} ({{ movie.rating }})</li>
        }
      </ul>
    }
    @if (error()) {
      <div>error()</div>
    }
  `,
  standalone: true,
  imports: [HttpClientModule],
})
export class MovieListComponent {
  isLoading = signal(true);
  movies = signal<Movie[]>([]);
  error = signal<string | null>(null);

  constructor(private movieService: CustomServiceService) {
    const movies$ = this.movieService.getHighRatedMovies();
    const fetchedMovies = toSignal(movies$, { initialValue: undefined });

    effect(() => {
      const data = fetchedMovies();
      if (data) {
        this.movies.set(data);
        this.isLoading.set(false);
      }
    });
  }

  //Manuel call the interceptor
  /*constructor(private manualInterceptor: ManualInterceptorTriggerService) {}

  triggerInterceptor() {
    this.manualInterceptor.triggerInterceptor();
  }*/

  http = inject(HttpClient);

  getTodos(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(data => {
      console.log('Todos:', data);
    });
  }
}
