import { Component, inject, viewChild, ViewContainerRef } from '@angular/core'
import { DummyContentComponent } from '@shared/components/dummy-content/dummy-content.component'
import { DialogComponent, DialogService, Layout, Position } from '@ui-components'


@Component({
  selector: 'app-pokemon-modal',
  standalone: true,
  imports: [DialogComponent],
  template: `
    <button (click)="openDialog()">Open Dialog</button>
    <ng-template #dialogContainer></ng-template>`
})
export class PokemonModalComponent {
  private dialogContainer = viewChild('dialogContainer', { read: ViewContainerRef })
  private dialogService = inject(DialogService)
  public positionType = Position
  public layoutType = Layout

  openDialog() {
    const dialogContainer = this.dialogContainer()

    if (dialogContainer instanceof ViewContainerRef) {
      const dialog = this.dialogService.load(dialogContainer)

      if (dialog.ref) {
        dialog.ref?.setInput('position', 'nadir')
        dialog.ref?.setInput('layout', 'free')
        dialog.open()
        dialog.ref.instance.injectComponent(DummyContentComponent)
        dialog.status(dialog.ref.instance).subscribe((status) => {
          if (status === 'closed' || status === 'canceled') {
            dialog.ref?.destroy()
          }
        })
      }

    }
  }
}
