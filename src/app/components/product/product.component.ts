import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;

  path: string;
  details: boolean = false;
  ngOnInit(): void {
    this.path = `${this.product.id}`;
  }
}
