import { AfterViewInit, Component, inject, OnDestroy, viewChild, ViewContainerRef } from '@angular/core'

import { DialogComponent, DialogService, DialogStatus, Layout, Position } from '@ui-components'
import { DummyContentComponent } from '@shared/components/dummy-content/dummy-content.component'

@Component({
  standalone: true,
  imports: [DialogComponent],
  selector: 'app-home-modal',
  template: `<button (click)="dialogRef.open()">Open Dialog</button>
  <lib-ui-dialog #dialogRef
    [position]="options.position.CENITAL"
    [layout]="options.layout.FREE">
    <div class="modal-body">
      <div header>
        <button (click)="dialogRef.close()">close</button>
      </div>
      <div>
        <ng-container #portalRef/>
      </div>
      <div footer>I'm footer</div>
    </div>
  </lib-ui-dialog>`,
  styles: `.modal-body {
    display: grid;
    row-gap: 1ch;
    grid-template-rows: min-content 1fr auto;
    height: 100%;
  }`
})

export class ModalComponent implements AfterViewInit, OnDestroy {
  private dialogRef = viewChild<DialogComponent>('dialogRef')
  private $portal = viewChild('portalRef', { read: ViewContainerRef })
  private dialogService = inject(DialogService)

  public options = {
    position: Position,
    layout: Layout
  }

  private injectComponent(component: any) {
    if (component) {
      this.$portal()?.clear()
      this.$portal()?.createComponent(component)
    }
  }

  ngAfterViewInit(): void {
    const dialog = this.dialogService.load(this.dialogRef() as DialogComponent)
    dialog.status().subscribe(status => {
      if (status === DialogStatus.OPENED) {
        this.injectComponent(DummyContentComponent)
      }
    })

  }

  ngOnDestroy() {
    this.$portal()?.clear()
  }
}
