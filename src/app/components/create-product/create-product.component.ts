import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0),
    count: new FormControl<number>(0),
    category: new FormControl<string>(''),
    image: new FormControl<string>(''),
    rate: new FormControl<number>(0, [Validators.min(0), Validators.max(10)]),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    this.productService
      .create({
        title: this.form.value.title as string,
        price: this.form.value.price as number,
        description: this.form.value.description as string,
        image: this.form.value.image as string,
        category: this.form.value.category as string,
        rating: {
          rate: this.form.value.rate as number,
          count: this.form.value.count as number,
        },
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
