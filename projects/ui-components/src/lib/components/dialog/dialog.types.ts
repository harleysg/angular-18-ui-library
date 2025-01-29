import { ComponentRef } from '@angular/core'
import { Observable } from 'rxjs'
import { DialogComponent } from './dialog.component'

export enum Position {
  CENITAL = 'cenital',
  RIGHT = 'right',
  NADIR = 'nadir',
  LEFT = 'left',
  CENTER = 'center',
  SCREEN = 'screen'
}

export type Positions = typeof Position[keyof typeof Position]

export enum DialogStatus {
  OPENED = 'opened',
  CLOSED = 'closed',
  CANCELED = 'canceled'
}

export enum Layout {
  FULL = 'full',
  FREE = 'free'
}

export type Layouts = typeof Layout[keyof typeof Layout]

export type Status = typeof DialogStatus[keyof typeof DialogStatus]

export type DialogServiceEvents = {
  ref?: ComponentRef<DialogComponent> | null
  open: (ref?: DialogComponent) => void
  close: (ref?: DialogComponent) => void
  status: (ref?: DialogComponent) => Observable<Status | null>
}
