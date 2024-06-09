import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent, DialogService, Layout, Position } from "ui-components";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgTemplateOutlet, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'www';
  dialogLateral = viewChild<DialogComponent>('dialogLateralRef')
  dialogCenital = viewChild<DialogComponent>('dialogCenitalRef')
  dialogService = inject(DialogService)

  public positionType = Position
  public layoutType = Layout

  ngOnInit(): void {
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
      }
    })
  }
}
