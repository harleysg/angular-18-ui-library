import { HttpClient } from '@angular/common/http'
import { catchError, Observable } from 'rxjs'
import { inject, Injectable } from '@angular/core'

import {EnvironmentService} from '@shared/services/environment/environment.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private env = inject(EnvironmentService)
  private http = inject(HttpClient)
  private url = this.env.getValue('productsAPI') as string;

  public getProducts<T>(): Observable<T[]> {
    return this.http.get<T[]>(this.url)
    .pipe(catchError((error) => {
      throw { message: new Error(`${error.status} | ${error.name}`).message }
    }));
  }
}
