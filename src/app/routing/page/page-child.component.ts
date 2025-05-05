import { Component } from '@angular/core';

@Component({
  selector: 'app-page-child',
  imports: [],
  template: ``,
  standalone: true,
  styles: ``,
})
export class PageChildComponent {
  sayHello() {
    console.log('Hello from the Child!');
  }
}
