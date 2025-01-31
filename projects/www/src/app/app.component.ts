import { Component, computed, effect, inject, viewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutService } from '@layout/main/layout.service'
import { NgBrandComponent, DialogComponent } from '@ui-components'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogComponent, NgBrandComponent],
  template: `
  <lib-ui-dialog #loadingModal class="loadingModal">
    <header class="o-header">
      <div class="content">
        <lib-ng-brand [clipPathId]="'appCompClipPath'" />
      </div>
    </header>
    <div class="content">
      <h3>Loading...</h3>
    </div>
  </lib-ui-dialog>
  <router-outlet />`,
  styles: `
  .loadingModal {
    --ui-dialog-width: 100vw;
    --ui-dialog-height: 100vh;
    --ext-ui-dialog-center-max-width: 100%;
    --ext-ui-dialog-center-max-height: 100%;

    section {
      display: grid;
      row-gap: 1rem;

      h3 {
        font-size: 2.125rem;
        font-weight: 500;
        letter-spacing: -0.1rem;
        margin: 0;
      }
    }

    .o-header {
      padding-block-start: 0;
    }
  }
  `
})
export class AppComponent {
  private dialogRef = viewChild<DialogComponent>('loadingModal')
  public layoutService = inject(LayoutService)

  isLoading = computed(() => this.layoutService.isLoading())

  constructor() {
    effect(() => {
      if (this.isLoading()) {
        this.dialogRef()?.open()
      } else {
        this.dialogRef()?.close()
      }
    }, {
      allowSignalWrites: true
    })
  }
}
