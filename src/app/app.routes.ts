import { Routes } from '@angular/router';

// Components
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'artworkDetail/:objectNumber',
        component: DetailComponent
    },
    {
        path: '**',
        component: ListComponent
    }
];