import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from './products.model'

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private activatedRoute = inject(ActivatedRoute)
  public products: Product[] = []
  public title: string = ''

  constructor() {
    this.activatedRoute.data.subscribe({
      next: ({ products, title }: any) => {
        console.log('PRODUCT FETCHING')
        this.title = title
        this.products = products
        console.log('PRODUCT FETCHED')
      },
      complete: () => {
      }
    })
  }
}
