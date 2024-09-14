import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/main/layout.component'

export const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./pages/home/home.routes').then(m => m.HomeRouting)
    },
    {
      path: 'demo',
      loadChildren: () => import('./pages/demo/demo.routes').then(m => m.DemoRouting)
    },
    {
      path: 'products',
      loadChildren: () => import('./pages/products/products.routes').then(m => m.ProductsRouting)
    },
  ]
}]
