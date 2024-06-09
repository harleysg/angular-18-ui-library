import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { DialogComponent } from './dialog.component';

@Injectable({providedIn: 'root'})
export class DialogService {

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

  public status(ref?: DialogComponent): Observable<"opened" | "closed" | "canceled" | null> {
    if (ref instanceof DialogComponent) {
      return ref.status()
    }

    return of(null)
  }

}
