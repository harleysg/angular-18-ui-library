import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private loading = signal<boolean>(false)

  loadingStatus(status: boolean = false): void {
    this.loading.set(status)
  }

  get isLoading(): Signal<boolean> {
    return this.loading
  }
}