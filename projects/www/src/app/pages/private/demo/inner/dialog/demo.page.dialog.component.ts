import { Component, AfterViewInit, inject, OnInit, viewChild, ViewContainerRef } from '@angular/core';
import { DialogComponent, DialogService, DialogServiceEvents, Layout, Position } from "@ui-components";
import { DummyContentComponent } from '@shared/components/dummy-content/dummy-content.component';

@Component({
  selector: 'app-demo-page-dialog',
  standalone: true,
  imports: [
    DialogComponent,
    DummyContentComponent
  ],
  templateUrl: './demo.page.dialog.component.html',
  styles: `
  .actions { display: flex; gap: 1ch; flex-wrap: wrap; }
  section { display: grid; gap: 2ch; }
  
  `
})
export class DemoPageDialogComponent implements OnInit, AfterViewInit {
  private dialogLateralRef = viewChild<DialogComponent>('dialogLateralRef')
  private dialogCenitalRef = viewChild<DialogComponent>('dialogCenitalRef')
  private dialogCenterRef = viewChild<DialogComponent>('dialogCenterRef')
  private dialogService = inject(DialogService)
  private dialogInjected = viewChild('dialogInjected', { read: ViewContainerRef })

  public positionType = Position
  public layoutType = Layout
  public dialogLateral!: DialogServiceEvents
  public dialogCenital!: DialogServiceEvents
  public dialogCenter!: DialogServiceEvents

  ngOnInit() {
    this.dialogLateral = this.dialogService.load(this.dialogLateralRef() as DialogComponent)
    this.dialogCenital = this.dialogService.load(this.dialogCenitalRef() as DialogComponent)
    this.dialogCenter = this.dialogService.load(this.dialogCenterRef() as DialogComponent)
  }

  ngAfterViewInit(): void {
    this.dialogCenital.status().subscribe((status) => {
      if (status) {
        // DO something
      }
    })
    this.dialogCenter.status().subscribe((status) => {
      if (status) {
        // DO something
      }
    })
    this.dialogLateral.status().subscribe((status) => {
      if (status) {
        // DO something
      }
    })
  }

  openInjectedDialog() {
    const dialogInjected = this.dialogInjected()

    if (dialogInjected instanceof ViewContainerRef) {
      const dialog = this.dialogService.load(dialogInjected)

      if (dialog.ref) {
        dialog.ref?.setInput('position', 'center')
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
