import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResourceService } from '../service/newer-custom-service.service';

@Component({
  selector: 'app-resource',
  template: `
    @if (myValue$ | async; as myValue) {
      {{ myValue | json }}
    }

    @if (myValue()) {
      {{ myValue() | json }}
    }
  `,
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
})
export class ResourceComponent {
  resourceService = inject(ResourceService);
  myValue = this.resourceService.myResource.value;
  myValue$ = toObservable(this.myValue);

  ngOnInit() {
    this.myValue$.subscribe(value => {
      console.log('myValue:', value);
    });
  }
}
