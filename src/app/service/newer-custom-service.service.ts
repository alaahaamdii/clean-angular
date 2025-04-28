import { Injectable, signal } from '@angular/core'; // ressource can replace rxResource
import { rxResource } from '@angular/core/rxjs-interop';
import { fromFetch } from 'rxjs/fetch';
import {catchError, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  RESOURCE_URL = 'https://jsonplaceholder.typicode.com/todos/';

  id = signal(1);

  myResource = rxResource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) =>
        fromFetch(this.RESOURCE_URL + request.id, {
          selector: response => response.json() // Convert response to JSON
        }).pipe(
            switchMap(data => {
              // Handle the JSON data
              console.log('Data:', data);
              // You can store the data in a variable or state management store here
              return of(data);
            }),
            catchError(err => {
              // Handle errors
              console.error('Error:', err);
              return of({ error: true, message: err.message });
            })
        )
  });
}
