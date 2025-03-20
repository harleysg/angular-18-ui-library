import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgBrandComponent } from '@ui-components';
import { FULL_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgBrandComponent, NgClass],
  template: `
  <header class="o-header">
    <div class="content">
      <lib-ng-brand clipPathId="privateLayoutClipPath" />
      <nav>
        @for (route of routes; track $index) {
          <a [routerLink]="route.url" routerLinkActive="router-link-active" [ngClass]="{'is-disabled': route.disabled}">{{route.label}}</a>
        }</nav>
    </div>
  </header>
  <main class="o-main">
    <div class="content">
      <router-outlet />
    </div>
  </main>
  <footer class="o-footer">
    <div class="content">Private route</div>
  </footer>
  `,
  styles: `
:host {
  display: grid;
  row-gap: 1rem;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
}

.is-disabled {
  color: #ccc;
  cursor: help;
}

a {
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
}`
})
export class PrivateLayoutComponent {
  public routes = FULL_ROUTES
}
