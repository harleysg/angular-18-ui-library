import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent, DialogService, Layout, Position } from "@ui-components";

@Component({
  standalone: true,
  imports: [DialogComponent, NgTemplateOutlet],
  selector: 'demo-page',
  templateUrl: './demo.page.component.html'
})

export class DemoPageComponent implements OnInit {
  private dialogLateral = viewChild<DialogComponent>('dialogLateralRef')
  private dialogCenital = viewChild<DialogComponent>('dialogCenitalRef')
  private dialogService = inject(DialogService)
  private activatedRoute = inject(ActivatedRoute)

  public title = 'Demo page';
  public positionType = Position
  public layoutType = Layout

  constructor() {
    this.activatedRoute.data.subscribe({ next: ({data: { id }}) => {
      console.log("🚀 ~ DemoPageComponent ~ this.activatedRoute.data", {id});
    } })
  }

  ngOnInit() {
    this.dialogService.status(this.dialogLateral()).subscribe((status) => {
      if (status) {
        if (status !== 'canceled') {
          console.log("🚀 ~ AppComponent ~ Lateral ~ status:", status);
        }
      }
    })
    this.dialogService.status(this.dialogCenital()).subscribe((status) => {
      if (status) {
        if (status !== 'canceled') {
          console.log("🚀 ~ AppComponent ~ Cenital ~ status:", status);
        }
        if (status === 'opened') {
        }
      }
    })
  }
}
