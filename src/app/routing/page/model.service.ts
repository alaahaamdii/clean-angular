import { Injectable } from '@angular/core';
import { Model } from './model';
import { of } from 'rxjs'; // Simulating async data fetching

@Injectable({
    providedIn: 'root',
})
export class ModelService {
    // Simulating a list of ponies
    private ponies: Model[] = [
        { id: '1', firstName: 'Twilight', lastName: 'Sparkle' },
        { id: '2', firstName: 'Rainbow', lastName: 'Dash' },
        { id: '3', firstName: 'Fluttershy', lastName: 'Shy' },
    ];

    // Method to fetch a pony by ID
    get(id: string) {
        const pony = this.ponies.find((p) => p.id === id);
        return of(pony); // Return as an observable
    }
}
