import {Component, inject, input, Signal} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, ParamMap, RouterLink, RouterOutlet} from '@angular/router';
import { Model } from './model';
import { ModelService } from './model.service';
import {NgIf} from "@angular/common";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'app-page',
  imports: [NgIf, RouterOutlet, RouterLink],
  template: `
    <div *ngIf="ponyModel()">
      <h2>Pony Information</h2>
      <p><strong>ID:</strong> {{ ponyModel()?.id }}</p>
      <p><strong>First Name:</strong> {{ ponyModel()?.firstName }}</p>
      <p><strong>Last Name:</strong> {{ ponyModel()?.lastName }}</p>
    </div>
    <div *ngIf="!ponyModel()">
      <p>Loading pony information...</p>
    </div>
    <a routerLink="/page/1/child" >Child</a>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  styles: ``,
})
export class PageComponent {
  readonly ponyModel: Signal<Model | undefined>;
  readonly ponyId = input.required<string>();
  route = inject(ActivatedRoute);
  ponyService = inject(ModelService);

  readonly raceModel$ = toObservable(this.ponyId).pipe(switchMap(id => this.ponyService
      .get(id)));
  readonly raceModel = toSignal(this.raceModel$);
  constructor() {
   /*
    const ponyId = route.snapshot.paramMap.get('ponyId')!;
*/

    this.ponyModel = toSignal(
        this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('ponyId')!),
            switchMap(id => this.ponyService.get(id))
        )
    );


  }
}
