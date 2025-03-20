import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-ui-button',
  standalone: true,
  imports: [],
  template: `<button (click)="handleClick($event)" [disabled]="disabled()">
  <ng-content select="[icon-start]"></ng-content>
  <ng-content />
  <ng-content select="[icon-end]"></ng-content>
</button>`,
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  public onclick = output<MouseEvent>()
  public disabled = input<boolean>(false)

  public handleClick(event: MouseEvent) {
    if (this.disabled()) return

    this.onclick.emit(event)
  }
}
