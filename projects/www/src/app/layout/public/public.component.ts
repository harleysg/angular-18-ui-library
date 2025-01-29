import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgBrandComponent } from '@ui-components';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgBrandComponent],
  template: `
  <header class="o-header">
    <div class="content">
      <lib-ng-brand clipPathId="publiLayoutClipPath" />
      <nav>
        <a [routerLink]="['/']" routerLinkActive="router-link-active" >Home</a>
        <a [routerLink]="['/private/demo']" routerLinkActive="router-link-active" >Demo</a>
        <a [routerLink]="['/private/pokemon']" routerLinkActive="router-link-active" >Pokemon</a>
        <a [routerLink]="['/private/products']" routerLinkActive="router-link-active" >Products</a>
      </nav>
    </div>
  </header>
  <main class="o-main">
    <div class="content">
      <router-outlet />
    </div>
  </main>
  <footer class="o-footer">
    <div class="content">Public route</div>
  </footer>
  `,
  styles: `
:host {
  display: grid;
  row-gap: 1rem;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
}

nav {
  display: flex;
  gap: 1rem;
}`
})
export class PublicLayoutComponent {

}
