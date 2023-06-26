import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, retry, tap, Observable, throwError } from 'rxjs';
import { IProduct } from '../models/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products', {
        params: new HttpParams({
          fromObject: { limit: 15 },
        }),
      })
      .pipe(
        delay(200),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http
      .post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(tap((prod) => this.products.push(prod)));
  }

  getOne(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>('https://fakestoreapi.com/products/' + id)
      .pipe(delay(200),  catchError(this.errorHandler.bind(this)));
  }

  getCategories() {
    return this.http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getProductsWithCategories(category: string) {
    return this.http
      .get<IProduct[]>(
        'https://fakestoreapi.com/products/category/' + category,
        {
          params: new HttpParams({
            fromObject: { limit: 15 },
          }),
        }
      )
      .pipe(
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
