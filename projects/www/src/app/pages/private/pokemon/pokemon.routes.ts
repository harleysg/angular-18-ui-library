import { Route } from '@angular/router';

export const PokemonRouting: Route[] = [{
  path: '',
  loadComponent: () => import('./pokemon.component').then(c => c.PokemonComponent),
  data: { title: 'Pokemon page' }
}]