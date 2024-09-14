import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [],
  templateUrl: './home.page.component.html'
})
export class HomePageComponent {
  private activatedRoute = inject(ActivatedRoute)
  public title:string = ''

  constructor() {
    this.activatedRoute.data.subscribe({ next: ({ title }) => {
      this.title = title
    }})
  }
}
