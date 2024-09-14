import { Route } from '@angular/router'
import { ProductsComponent } from './products.component'
import { ProductsResolverService } from './products.resolver.service'

export const ProductsRouting: Route[] = [{
  path: '',
  component: ProductsComponent,
  resolve: { products: ProductsResolverService },
  data: { title: 'Product page' }
}]
