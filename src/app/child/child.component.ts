import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  template: `
    <div>
      <p>Child Component</p>
      <p>Received from parent: {{ inputData }}</p>
      <button (click)="sendData()">Send Data to Parent</button>
    </div>
  `,
  standalone: true,
  styles: ``
})
export class ChildComponent {
    @Input() inputData: string = ''; // Input property to receive data from parent
    @Output() outputData = new EventEmitter<string>(); // Output property to send data to parent

    sendData() {
        this.outputData.emit('Hello from Child!'); // Emit an event with data
    }
}
