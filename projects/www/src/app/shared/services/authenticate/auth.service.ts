import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal(true); // Signal to track authentication state

  get isAuthenticated(): Signal<boolean> {
    return this._isAuthenticated;
  }

  login(): void {
    this._isAuthenticated.set(true); // Update the signal state
  }

  logout(): void {
    this._isAuthenticated.set(false); // Update the signal state
  }
}
