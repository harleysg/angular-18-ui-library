import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { StorageManagerService } from '@ui-components'

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageManagerService)
  const token = storageService.getItem('token')
  let headers = req.headers.set('ContentType', 'application/json')

  if (token) headers.set('Authorization', `Bearer ${token}`)

  const authReq = req.clone({ headers })

  return next(authReq);
};
