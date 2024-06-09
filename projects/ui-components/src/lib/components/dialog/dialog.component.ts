import { Component, ElementRef, OnDestroy, OnInit, input, output, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
// -----
import { BehaviorSubject, Observable, Subject } from "rxjs";
// -----
import { Layout, Layouts, Position, Positions } from './dialog.types';

@Component({
  selector: 'lib-ui-dialog',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit, OnDestroy {
  private dialog = viewChild<ElementRef<HTMLDialogElement>>('dialogRef')
  // inputs
  public position = input<Positions>(Position.CENTER)
  public layout = input<Layouts>(Layout.FREE)
  // outputs
  public onOpen = output<void>()
  public onClose = output<'close'|'cancel'>()
  // properties
  public positionType = Position
  public layoutType = Layout
  public blockEscape = input<boolean>(false)
  // -------
  private _dialogStatus$ = new Subject<'opened'|'closed'|'canceled'>()

  public status() {
    return this._dialogStatus$.asObservable()
  }

  public open(): void {
    const dialog = this.dialog()?.nativeElement

    if (!dialog?.open) {
      dialog?.showModal();
      this._dialogStatus$.next('opened')
    }
  }

  public close(): void {
    const dialog = this.dialog()?.nativeElement

    if (dialog?.open) {
      dialog?.close();
    }
  }

  private canceled(): void {
    this.onClose.emit('cancel')
    this._dialogStatus$.next('canceled')
  }

  private closed(event: Event): void {
    if (this.blockEscape()) event.preventDefault()
    this.onClose.emit('close')
    this._dialogStatus$.next('closed')
  }

  ngOnInit(): void {
    const dialog = this.dialog()?.nativeElement

    if (dialog) {
      dialog.addEventListener('cancel', this.canceled.bind(this))
      dialog.addEventListener('close', this.closed.bind(this))
    }
  }

  ngOnDestroy(): void {
    const dialog = this.dialog()?.nativeElement

    if (dialog) {
      dialog.removeEventListener('cancel', this.canceled.bind(this))
      dialog.removeEventListener('close', this.closed.bind(this))
    }
  }
}
