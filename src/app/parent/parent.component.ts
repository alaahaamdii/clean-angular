import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-parent',
  imports: [
    ChildComponent,
    FormsModule // 👈 needed for [(ngModel)]
  ],
  template: `
    <div style="border: 2px solid #ccc; padding: 16px;">
      <p>Parent Component</p>
      <label>
        Enter text to send to child:
        <input style="padding: 6px; margin-top: 10px; display: block;" [(ngModel)]="parentData" />
      </label>
      <app-child [inputData]="parentData" (outputData)="handleChildData($event)"></app-child>
      <p><strong>Received from child:</strong> {{ receivedData }}</p>
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
