import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  env!: { [key: string]: string | boolean }

  constructor() {
    this.env = environment
  }

  getValue(key: string): string | boolean {
    return this.env[key]
  }
}
