import { Routes } from '@angular/router';
import { PrivateLayoutComponent } from '../../layout/private/private.component';
import { authGuard } from '@shared/guards/auth.guard';

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
      },
      {
        path: 'demo',
        title: 'demo',
        canActivate: [authGuard],
        loadChildren: () => import('./demo/demo.routes').then(m => m.DemoRouting)
      },
      {
        path: 'products',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadChildren: () => import('./products/products.routes').then(m => m.ProductsRouting)
      }
    ]
  }
]
