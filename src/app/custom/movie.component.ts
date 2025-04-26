import { Component } from '@angular/core';
import { CustomServiceService, Movie } from '../service/custom-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  template: `
    <h2>High Rated Movies (rating > 8)</h2>
    <ul>
      <li *ngFor="let movie of movies">{{ movie.title }} ({{ movie.rating }})</li>
    </ul>
  `,
  standalone: true,
  imports: [NgFor],
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private movieService: CustomServiceService) {}

  ngOnInit() {
    this.movieService.getHighRatedMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
