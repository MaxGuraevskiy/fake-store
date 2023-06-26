import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { Observable, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent {
  item: IProduct;

  @Input()
  set id(itemId: number) {
    this.productsService.getOne(itemId).subscribe((product) => {
      this.item = product;
    });
  }

  constructor(public productsService: ProductsService) {}
}
