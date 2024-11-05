import { Injectable, signal, WritableSignal } from '@angular/core'

import { DialogComponent } from './dialog.component'
import { Status } from './dialog.types'
import { Observable, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DialogActionService {
  public open(ref?: DialogComponent) {
    if (ref instanceof DialogComponent) {
      ref.open()
    }
  }

  public close(ref?: DialogComponent) {
    if (ref instanceof DialogComponent) {
      ref.close()
    }
  }

  public status(ref?: DialogComponent): Observable<Status> | Observable<null> {
    if (ref instanceof DialogComponent) {
      return ref.status()
    }

    return of(null)
  }
}