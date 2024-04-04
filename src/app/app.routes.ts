import {Routes} from '@angular/router';
import {F1Component} from './components/f1/f1.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'app',
        component: F1Component
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
