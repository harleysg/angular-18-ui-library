import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { inject, Injectable, PLATFORM_ID } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private platformId = inject(PLATFORM_ID)

  public isServer() {
    return isPlatformServer(this.platformId)
  }

  public isBrowser() {
    return isPlatformBrowser(this.platformId)
  }
}
