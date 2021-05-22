import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product)
      });
    });
  }

  saveProduct(event: Event){
    event.preventDefault();
    
    if(this.form.value){
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe(newProduct => {
        this.router.navigate(['admin/products'])
      })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['',[Validators.required]],
      price: [0,[Validators.required, MyValidators.isPriceValid]],
      description: ['',[Validators.required]],
      image: '',
    })
  }

  get priceField(){
    return this.form.get('price');
  }

}
