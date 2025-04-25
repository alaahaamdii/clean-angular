import {
    Component,
    input,
    output,
    signal,
    effect
} from '@angular/core';

@Component({
    selector: 'app-new-child',
    standalone: true,
    template: `
        <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
            <p>List</p>
            <ul>
                @for (item of items; track item.id) {
                <li>{{ item.name }}</li>
                }
            </ul>
            <p>Child Component</p>
            <p>Received from parent: {{ inputData() }}</p>
            <button (click)="sendBack()">Send Data to Parent</button>
            @if (log()) {
            <p>{{ log() }}</p>
            }
        </div>
    `
})
export class NewChildComponent {
    inputData = input<string>(); // functional version of @Input()
    outputData = output<string>(); // functional version of @Output()
    items: { id: number; name: string }[] = [
        {id: 1, name: 'Apple'},
        {id: 2, name: 'Banana'},
        {id: 3, name: 'Cherry'},
        {id: 4, name: 'Date'}
    ];

    log = signal('');

    constructor() {
        effect(() => {
            const val = this.inputData();
            this.log.set(`inputData changed to "${val}"`);
        });
    }

    sendBack() {
        this.outputData.emit('Hello from Child!');
    }
}
