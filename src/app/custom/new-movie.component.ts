import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomServiceService, Movie } from '../service/custom-service.service';

@Component({
  selector: 'app-new-movie-list',
  template: `
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
  standalone: true
})
export class MovieListComponent {
  isLoading = signal(true);
  movies = signal<Movie[]>([]);
  error = signal<string | null>(null);

  constructor(private movieService: CustomServiceService) {
    // NOW safe to use movieService
    const movies$ = this.movieService.getHighRatedMovies();
    const fetchedMovies = toSignal(movies$, { initialValue: undefined });

    // connect
    effect(() => {
      const data = fetchedMovies();
      if (data) {
        this.movies.set(data);
        this.isLoading.set(false);
      }
    });
  }
}
