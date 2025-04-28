import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewChildComponent } from '../child/new-child.component';

@Component({
  selector: 'app-new-parent',
  standalone: true,
  imports: [NewChildComponent, ReactiveFormsModule],
  template: `
    <div style="border: 2px solid #ccc; padding: 16px;">
      <p>Parent Component</p>
      <label>
        Enter text to send to child:
        <input style="padding: 6px; margin-top: 10px; display: block;" [formControl]="parentData" />
      </label>
      <app-new-child [inputData]="parentData.value ?? ''" (outputData)="handleChildData($event)">
      </app-new-child>
      <p><strong>Received from child:</strong> {{ receivedData() }}</p>
    </div>
  `,
})
export class NewParentComponent {
  //parentData = signal('Hello from Parent!'); // reactive signal for inputs
  receivedData = signal(''); // also a signal for reactivity
  parentData = new FormControl<string>('Hello from Parent!');

  handleChildData(data: string) {
    this.receivedData.set(data); // signal-based state update
  }
}
