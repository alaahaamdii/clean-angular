import { Component, signal } from '@angular/core';
import {NewChildComponent} from "../child/new-child.component";

@Component({
  selector: 'app-new-parent',
  standalone: true,
  imports: [NewChildComponent],
  template: `
    <div>
      <p>Parent Component</p>
      <app-new-child
        [inputData]="parentData()"
        (outputData)="handleChildData($event)">
      </app-new-child>
      <p>Received from child: {{ receivedData() }}</p>
    </div>
  `
})
export class NewParentComponent {
  parentData = signal('Hello from Parent!'); // reactive signal for inputs
  receivedData = signal(''); // also a signal for reactivity

  handleChildData(data: string) {
    this.receivedData.set(data); // signal-based state update
  }
}
