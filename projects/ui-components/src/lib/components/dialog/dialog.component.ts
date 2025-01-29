import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  effect,
  input,
  output,
  signal,
  viewChild,
  computed
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
// -----
import { Subject } from 'rxjs'
// -----
import { DialogStatus, Layout, Layouts, Position, Positions, Status } from './dialog.types'

@Component({
  selector: 'lib-ui-dialog',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
  <dialog #dialogRef class="{{ 'to-'+position() }}" [style.--ui-dialog-transition-display-duration]="delayTimeout()+'ms'">
      @if (isInjected()) { <ng-container #injectionComponentRef></ng-container> }
      @if (layout() === layoutType.FULL) { <ng-container [ngTemplateOutlet]="fullLayout" /> }
      @else { <ng-container [ngTemplateOutlet]="defaultLayout" /> }
  </dialog>

  <!-- default layout -->
  <ng-template #defaultLayout>
    <ng-container [ngTemplateOutlet]="portal" />
  </ng-template>

  <!-- full layout -->
  <ng-template #fullLayout>
    <ng-content select="[header]"></ng-content>
    <ng-container [ngTemplateOutlet]="portal" />
    <ng-content select="[footer]"></ng-content>
  </ng-template>

  <!-- default content -->
  <ng-template #portal >
    <ng-content />
  </ng-template>
  `,
  styleUrls: [`./dialog.animation.scss`, './dialog.component.scss']
})
export class DialogComponent implements OnDestroy, AfterViewInit {
  private dialog = viewChild<ElementRef<HTMLDialogElement>>('dialogRef')
  private injectCompRef = viewChild('injectionComponentRef', { read: ViewContainerRef })
  // -------
  #_component: any
  #_dialogStatus$ = new Subject<Status>()
  #_closeStatus: Status | null = null
  #_isOpen = signal(false)
  // inputs
  public position = input<Positions>(Position.CENTER)
  public layout = input<Layouts>(Layout.FREE)
  public delayTimeout = input<number>(800)
  public blockEscape = input<boolean>(false)
  // outputs
  public onOpen = output<void>()
  public onClose = output<'close' | 'cancel'>()
  // properties
  public isInjected = signal(false)
  public layoutType = Layout

  constructor() {
    effect(() => {
      if (this.injectCompRef()) {
        this.injectCompRef()?.clear()
        this.injectCompRef()?.createComponent(this.#_component)
      }
    })
  }

  public isOpen = computed(() => this.#_isOpen())

  public status() {
    return this.#_dialogStatus$.asObservable()
  }

  public open(): void {
    const dialog = this.dialog()?.nativeElement

    if (!dialog?.open) {
      this.#_isOpen.set(true)
      dialog?.showModal()
      this.broadCastEvent(DialogStatus.OPENED)
    }
  }

  public close(): void {
    const dialog = this.dialog()?.nativeElement

    if (dialog?.open) {
      this.#_isOpen.set(false)
      dialog?.close();
    }
  }

  public injectComponent(component: any) {
    if (component) {
      this.isInjected.set(true)
      this.#_component = component
    }
  }

  private broadCastEvent(status: Status): void {
    this.#_dialogStatus$.next(status)
  }

  private canceled(): void {
    this.#_closeStatus = DialogStatus.CANCELED
    this.onClose.emit('cancel')
  }

  private closed(event: Event): void {
    const { CANCELED, CLOSED } = DialogStatus

    if (this.blockEscape() && this.#_closeStatus === CANCELED) event.preventDefault()

    setTimeout(() => {
      this.onClose.emit('close')
      this.broadCastEvent(this.#_closeStatus === CANCELED ? CANCELED : CLOSED)
    }, this.delayTimeout());
  }

  ngAfterViewInit(): void {
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
