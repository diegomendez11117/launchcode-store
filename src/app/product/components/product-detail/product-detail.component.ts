import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ProductsService } from "./../../../core/services/products/products.service";
import { Product } from "./../../../core/models/product.model";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.productsService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  createProduct() {
    const newProduct: Product = {
      id: "123",
      price: 29.99,
      title: "Zapato Roto",
      description: "hay que caminar mucho",
      image: "assets/images/banner-1.jpg",
    };
    this.productsService.createProduct(newProduct).subscribe((product) => {
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 20,
      description: "Hello Everyone",
    };

    this.productsService
      .updateProduct(this.product.id, updateProduct)
      .subscribe((product) => {
        
      });
  }

  deleteProduct(){
    this.productsService.deleteProduct(this.product.id).subscribe((product) => {})
  }
}
