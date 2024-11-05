import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [ModalComponent],
  templateUrl: './home.page.component.html'
})
export class HomePageComponent {
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
