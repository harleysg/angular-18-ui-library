import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DateFromToPipe } from '@shared/pipes/date-from-to.pipe';

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [DateFromToPipe],
  templateUrl: './home.page.component.html',
  providers: [DatePipe]
})
export class HomePageComponent {
  private activatedRoute = inject(ActivatedRoute)
  public title: string = ''
  public from = '2019-12-23'
  public to = '2020/01/05'

  constructor() {
    this.activatedRoute.data.subscribe({
      next: ({ title }) => {
        this.title = title
      }
    })
  }
}
