import {
    Component,
    input,
    output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'app-new-child',
    standalone: true,
    template: `
        <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
            <p>Child Component</p>
            <p>Received from parent: {{ inputData() }}</p>
            <button (click)="sendBack()">Send Data to Parent</button>
        </div>
    `
})
export class NewChildComponent {
    inputData = input<string>(); // functional version of @Input()
    outputData = output<string>(); // functional version of @Output()

    sendBack() {
        this.outputData.emit('Hello from Child!');
    }
}
