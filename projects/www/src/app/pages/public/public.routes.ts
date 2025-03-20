import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '../../layout/public/public.component';

export const PublicRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        data: {
          title: 'Home'
        },
        title: 'home',
        loadComponent: () => import('./home/home.page.component').then(c => c.HomePageComponent)
      }
    ]
  }
]