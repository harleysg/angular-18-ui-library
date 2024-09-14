import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { Product } from '../products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://fakestoreapi.com/products?limit=6';
  private http = inject(HttpClient)

  public getProducts<T>(): Observable<T[]> {
    return this.http.get<T[]>(this.url)
    .pipe(catchError((error) => {
      throw { message: new Error(`${error.status} | ${error.name}`).message }
    }));
  }
}
