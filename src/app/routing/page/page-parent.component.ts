import { NgFor } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PageChildComponent } from './page-child.component';

@Component({
  selector: 'app-page-parent',
  imports: [NgFor, PageChildComponent],
  template: `
    <input #myInput type="text" placeholder="Type something..." />
    <button (click)="focusInput()">Focus Input</button>
    <hr />
    <app-page-child></app-page-child>
    <button (click)="callChild()">Call Child Method</button>
    <hr />
    <input #inputBox type="text" *ngFor="let i of [1, 2, 3]" />
    <button (click)="focusAll()">Focus All</button>
  `,
  standalone: true,
  styles: ``,
})
export class PageParentComponent {
  //@ViewChild in Angular to access a DOM element or a child component directly from the class
  //@ViewChild is used to access template elements or child components directly in your TypeScript class. It's useful for DOM manipulation, imperative logic, or calling methods on child components
  @ViewChild('myInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild(PageChildComponent) child!: PageChildComponent;
  @ViewChildren('inputBox') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  focusAll() {
    this.inputs.forEach(input => input.nativeElement.focus());
  }

  callChild() {
    this.child.sayHello();
  }

  focusInput() {
    this.inputRef.nativeElement.focus();
  }
}
