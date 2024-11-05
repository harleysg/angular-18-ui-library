import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon.modal.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    PokemonModalComponent
  ],
  template: `<h1>Hi, {{title}}</h1>
  <!--  -->
  <app-pokemon-modal #dialogPokemonRef />`
})
export class PokemonComponent {
  private activatedRoute = inject(ActivatedRoute)
  public title: string = ''

  constructor() {
    this.activatedRoute.data.subscribe({
      next: ({ title }) => {
        this.title = title
      }
    })
  }
}
