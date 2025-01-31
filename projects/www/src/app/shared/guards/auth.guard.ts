import { CanActivateChildFn } from '@angular/router';

export const authGuard: CanActivateChildFn = (_childRoute, _state) => {
  return true
};
