import { inject, Injectable } from '@angular/core'
import { PlatformService } from '../platform/platform-service.service'

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {
  private platformService = inject(PlatformService)

  setItem(key: string, value: any, options?: { parse: boolean }) {
    if (this.platformService.isBrowser()) {
      let _value = value
      try {
        if (options?.parse) (_value = JSON.stringify(value))
        localStorage.setItem(key, _value)
      } catch (error) { }
    }
  }

  getItem(key: string, options?: { parse: boolean }): any | null {
    if (this.platformService.isBrowser()) {
      return options?.parse
        ? JSON.parse(localStorage.getItem(key) ?? '{}')
        : localStorage.getItem(key)

    }

    return null
  }
}
