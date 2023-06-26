import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product';
import { ProductsService } from '../services/product.service';
import { tap } from 'rxjs';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(
    products: IProduct[],
    search: string,
    category: string
  ): IProduct[] {
    if (search.length === 0 && !category) return products;
    else if (search.length === 0 && category) {
      this.productsService
        .getProductsWithCategories(category)
        .subscribe(() => {});
      return this.productsService.products;
    } else if (!category && search.length !== 0) {
      return products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      this.productsService
        .getProductsWithCategories(category)
        .subscribe(() => {});
      return this.productsService.products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  constructor(public productsService: ProductsService) {}
}
