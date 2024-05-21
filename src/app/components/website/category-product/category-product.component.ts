import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.css'
})
export class CategoryProductComponent {
  activeCategoryId:number=0;
  constructor(private productsrv:ProductService,private route:ActivatedRoute){
    this.route.params.subscribe((res:any)=>{
      this.activeCategoryId=res.id;
      this.getProductByCategory();
    })
  }
productList:any=[];
ngOnInit(): void {
  
}

getProductByCategory(){
  this.productsrv.getProductByCategoryId(this.activeCategoryId).subscribe((res:any)=>{
   this.productList=res;
  })
}
}
