import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { of, catchError } from 'rxjs'

import { ProductService } from './services/products.services'
import { Product } from './products.model'

export const ProductsResolverService: ResolveFn<Product[] | any[]> = (route, state) => {
  const product = inject(ProductService)
  return product.getProducts().pipe(
    catchError(error => {
      console.error("✖️ | ProductsResolverService ~ resolve:", error.message)
      return of([])
    })
  )
}
