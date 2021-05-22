import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  
  form: FormGroup;
  product: Product;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  saveProduct(event: Event){
    event.preventDefault();
    
    if(this.form.value){
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe(newProduct => {
        this.router.navigate(['admin/products'])
      })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['',[Validators.required]],
      title: ['',[Validators.required]],
      price: [0,[Validators.required, MyValidators.isPriceValid]],
      description: ['',[Validators.required]],
      image: '',
    })
  }

  get priceField(){
    return this.form.get('price');
  }

  upLoadFile(event){
    const file = event.target.files[0];
    const name = 'images';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.form.get('image').setValue(url)
        })
      })
    ).subscribe();
  }

}
