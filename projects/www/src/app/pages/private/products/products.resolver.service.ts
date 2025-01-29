import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { of, catchError, finalize, delay } from 'rxjs'

import { LayoutService } from '@layout/main/layout.service'
import { ProductService } from './services/products.services'
import { Product } from './products.model'

export const ProductsResolverService: ResolveFn<Product[] | any[]> = (route, state) => {
  const product = inject(ProductService)
  const layoutService = inject(LayoutService)

  layoutService.loadingStatus(true)

  return product.getProducts().pipe(
    delay(2000),
    catchError(error => {
      console.error("✖️ | ProductsResolverService ~ resolve:", error.message)
      return of([])
    }),
    finalize(() => {
      layoutService.loadingStatus(false)
    })
  )
}
