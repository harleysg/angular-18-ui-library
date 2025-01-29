import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent, DialogService, DialogServiceEvents, Layout, Position } from "@ui-components";
import { DummyContentComponent } from "@shared/components/dummy-content/dummy-content.component";

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DialogComponent,
    DummyContentComponent
  ],
  selector: 'demo-page',
  templateUrl: './demo.page.component.html'
})

export class DemoPageComponent implements OnInit, AfterViewInit {
  private dialogLateralRef = viewChild<DialogComponent>('dialogLateralRef')
  private dialogCenitalRef = viewChild<DialogComponent>('dialogCenitalRef')
  private dialogCenterRef = viewChild<DialogComponent>('dialogCenterRef')
  private dialogService = inject(DialogService)
  private activatedRoute = inject(ActivatedRoute)

  public title = 'Demo page';
  public positionType = Position
  public layoutType = Layout
  public dialogLateral!: DialogServiceEvents
  public dialogCenital!: DialogServiceEvents
  public dialogCenter!: DialogServiceEvents

  constructor() {
    this.activatedRoute.data.subscribe({
      next: ({ data }) => {
        if (Object.keys(data).length) {
          const { id, user } = data
          console.log('👨‍🚀 ~ constructor ~ data:', data)
        }
      }
    })
  }

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
}
