import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-ng-brand',
  standalone: true,
  imports: [],
  templateUrl: './ng-brand.component.html',
  styles: `
  .angular-logo {
    width: min(7.2rem, 100%);
  }`
})
export class NgBrandComponent {
  clipPathId = input.required<string>()
  urlClipPath = computed(() => `url(#${this.clipPathId()})`)
  urlClipPathB = computed(() => `url(#${this.clipPathId()}B)`)
  urlClipPathC = computed(() => `url(#${this.clipPathId()}C)`)
}
