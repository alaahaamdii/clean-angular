import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/routing/app.config';
import { AppComponent } from './app/routing/app.component';

//bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
//For routing
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
