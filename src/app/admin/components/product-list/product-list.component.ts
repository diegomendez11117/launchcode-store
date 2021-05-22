import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/models/product.model";
import { ProductsService } from "src/app/core/services/products/products.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ["id", "title", "price", "actions"];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe((isOk) => {
      if (isOk) {
        this.products = this.products.filter((product) => product.id !== id);
      }
    });
  }
}
