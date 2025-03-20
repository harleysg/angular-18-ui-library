import { ComponentRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogServiceEvents } from './dialog.types';
import { DialogActionService } from './dialog.action.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  actions = inject(DialogActionService)

  private renderDialog(dialogContainer: ViewContainerRef) {
    return dialogContainer.createComponent(DialogComponent)
  }

  private ref(ref?: DialogComponent): DialogServiceEvents {
    const isInstance = ref instanceof DialogComponent
    return {
      open: () => isInstance ? setTimeout(() => this.actions.open(ref), 100) : null,
      close: () => isInstance ? setTimeout(() => this.actions.close(ref), 700) : null,
      status: () => isInstance ? this.actions.status(ref) : of(null),
    }
  }

  public load(dialogContainer: ViewContainerRef | DialogComponent) {
    let dialogRef: ComponentRef<DialogComponent> | null = null
    let ref: DialogServiceEvents = {
      open: () => null,
      close: () => null,
      status: () => of(null)
    }

    if (dialogContainer instanceof ViewContainerRef) {
      dialogRef = this.renderDialog(dialogContainer)
      ref = this.ref(dialogRef?.instance)
    } else if (dialogContainer instanceof DialogComponent) {
      ref = this.ref(dialogContainer)
    }

    return {
      ref: dialogRef,
      open: ref.open,
      close: ref.close,
      status: ref.status,
    }
  }
}
