import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './demo.page.component';
import { demoResolver } from './demo.resolver';

export const DemoRouting: Route[] = [{
  path: '',
  children: [
    {
      path: '',
      component: DemoPageComponent,
      resolve: {
        data: demoResolver
      }
    },
    {
      path: ':id',
      component: DemoPageComponent,
      resolve: {
        data: demoResolver
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
