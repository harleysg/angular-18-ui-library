import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageManagerService } from '@ui-components';

export const authGuard: CanActivateChildFn = (_childRoute, _state) => {
  const storage = inject(StorageManagerService)
  const router = inject(Router)

  if (storage.getItem('token')) return true

  router.navigate(['/'])

  return false
};
