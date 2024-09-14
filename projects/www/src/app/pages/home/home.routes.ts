import { Route } from '@angular/router';
import { HomePageComponent } from './home.page.component';

export const HomeRouting: Route[] = [{
  path: '',
  pathMatch: 'full',
  component: HomePageComponent,
  data: { title: 'Home page' }
}];
