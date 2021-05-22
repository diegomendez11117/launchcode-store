import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(
    private cartService: CartService
  ) {
   
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

  addCart() {
    this.cartService.addCart(this.product);
  }

}
