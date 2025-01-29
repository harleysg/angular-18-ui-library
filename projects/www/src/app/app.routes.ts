import { Routes } from '@angular/router'
import { LayoutComponent } from './layout/main/layout.component'
import { authGuard } from './shared/guards/auth.guard'

export const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./pages/public/public.routes').then(m => m.PublicRoutes)
    },
    {
      path: 'private',
      canActivateChild: [authGuard],
      loadChildren: () => import('./pages/private/private.routes').then(m => m.privateRoutes)
    },
    {
      path: '**',
      redirectTo: ''
    },
  ]
}]
