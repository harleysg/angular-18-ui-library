import { Routes } from '@angular/router';
import { PrivateLayoutComponent } from '../../layout/private/private.component';

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
        loadChildren: () => import('./demo/demo.routes').then(m => m.DemoRouting)
      },
      {
        path: 'pokemon',
        pathMatch: 'full',
        loadChildren: () => import('./pokemon/pokemon.routes').then(m => m.PokemonRouting)
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadChildren: () => import('./products/products.routes').then(m => m.ProductsRouting)
      }
    ]
  }
]
