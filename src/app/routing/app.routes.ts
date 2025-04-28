// app.routes.ts
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'page/:ponyId',
    loadChildren: () => import('./page/page.routes').then(m => m.pageRoutes),
  },
  { path: '**', redirectTo: '' }, // Catch-all route to redirect any unknown path to ''
];
