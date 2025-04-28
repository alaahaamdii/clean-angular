import { Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { ChildComponent } from '../child/child.component';
import { AuthGuard } from '../auth-gard.guard';
import { UserResolver } from '../resolver.service';

export const pageRoutes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'child',
                component: ChildComponent,
                canActivate: [AuthGuard],
                resolve: { userData: UserResolver }
            }
        ]
    }
];
