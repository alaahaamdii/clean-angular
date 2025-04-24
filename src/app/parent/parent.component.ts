import { Component } from '@angular/core';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-parent',
  imports: [
    ChildComponent
  ],
  template: `
    <div>
      <p>Parent Component</p>
      <app-child [inputData]="parentData" (outputData)="handleChildData($event)"></app-child>
      <p>Received from child: {{ receivedData }}</p>
    </div>
  `,
  standalone: true,
  styles: ``
})
export class ParentComponent {
  parentData: string = 'Hello from Parent!'; // Data to pass to child
  receivedData: string = ''; // Data received from child

  handleChildData(data: string) {
    this.receivedData = data; // Handle data received from child
  }
}
