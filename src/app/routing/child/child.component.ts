import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-child',
  imports: [],
  template: ` <p>child works!</p> `,
  standalone: true,
  styles: ``,
})
export class ChildComponent {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      console.log(data['userData']); // 'User Data Loaded'
    });
  }
}
