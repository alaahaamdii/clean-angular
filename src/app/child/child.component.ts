import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-child',
    imports: [],
    template: `
        <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
            <p>List</p>
            <ul>
                <li *ngFor="let item of items">{{ item.name }}</li>
            </ul>
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
    items: { id: number; name: string }[] = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
        { id: 4, name: 'Date' }
    ];
    sendData() {
        this.outputData.emit('Hello from Child!'); // Emit an event with data
    }
}
