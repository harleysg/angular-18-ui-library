import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoPageDialogComponent } from './inner/dialog/demo.page.dialog.component';

@Component({
  standalone: true,
  imports: [DemoPageDialogComponent],
  selector: 'demo-page',
  templateUrl: './demo.page.component.html',
  styles: [`
  :host { display: flex; flex-direction: column; gap: 1ch; }
  summary > * {
    display: inline;
  }
  details {
    display: flex;
    flex-direction: column;
    gap: 2ch;
  }
  `]
})

export class DemoPageComponent {
  private activatedRoute = inject(ActivatedRoute)

  public title = 'Demo page';

  constructor() {
    this.activatedRoute.data.subscribe({
      next: ({ data }) => {
        if (Object.keys(data).length) {
          console.log('👨‍🚀 ~ constructor ~ data:', data)
        }
      }
    })
  }
}
