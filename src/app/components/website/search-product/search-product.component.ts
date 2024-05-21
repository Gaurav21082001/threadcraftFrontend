import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {
  productList: any = [];
  searchString: any;
  constructor(private productsrv: ProductService, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    const searchString = String(routeParams.get('searchString'));
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.searchString = params.get('searchString');
        this.productsrv.searchProduct(this.searchString).subscribe((res: any) => {
          this.productList = res;
        });
      },
      error: (error) => {
        alert("error while feching products " + error);
      }
    }

    );
  }


}
