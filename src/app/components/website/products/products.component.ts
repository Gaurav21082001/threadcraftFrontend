import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  productList: any;
  constructor(private productsrv: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsrv.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res;
      },
      error: (error) => {
        console.log(error);
        alert("Error while feching products " + error);
      }
    })
  }
}

