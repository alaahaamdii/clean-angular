import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OpenAIGenService, Todo } from '../service/openai-gen.service';

@Component({
  selector: 'app-movie-list',
  template: `
    <div *ngIf="todo">
      <h1>{{ todo.title }}!</h1>
    </div>
  `,
  standalone: true,
  imports: [NgIf],
})
export class OpenAIGenComponent {
  constructor(private openAi: OpenAIGenService) {}

  title = 'my-app';
  todo?: Todo;

  ngOnInit() {
    this.openAi.getTodoById(1).subscribe({
      next: (data: Todo) => (this.todo = data),
      error: (err: any) => console.error(err),
    });
  }
}
