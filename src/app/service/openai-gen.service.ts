import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Todo {
  userId?: number;
  id?: number;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OpenAIGenService {
  httpClient = inject(HttpClient);
  public getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
