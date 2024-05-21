import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  isSidePanelVisible:boolean=false;
  
  constructor(private productsrv:ProductService,private cateService:CategoryService,private toast:ToastrService){}
  
  productObj:Product={
    'productId':0,
    'productName':"",
    'description':"",
    'price':0,
    'stock':0,
    'categoryId':0,
    'status':0,
    'actualPrice':0,
    'imageUrl':""
  }
  productList:any []=[];
  categoryList:any []=[];
  
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
  }

  getAllProducts(){
    this.productsrv.getAllProducts().subscribe((res:any)=>{
      this.productList=res;
    })
  }

  getAllCategory(){
    this.cateService.getAllCategory().subscribe((res:any)=>{
      this.categoryList=res;
    })
  }

  onEdit(product:Product){
    this.productObj=product;
    this.openSidePanel();
  }
  onUpdate(){
    this.productsrv.updateProduct(this.productObj.productId,this.productObj).subscribe((res:any)=>{
      this.toast.success("Product updated successfully");
      this.isSidePanelVisible=false;
      this.getAllProducts();
    })
  }
  resetForm() {
    this.productObj = {
      productId:0,
      productName:"",
      description:"",
      price:0,
      stock:0,
      categoryId:0,
      status:0,
      actualPrice:0,
      imageUrl:""
    }
  }
  openSidePanel(){
    this.isSidePanelVisible=true;
  }

  closeSidePanel(){
    this.isSidePanelVisible=false;
  }

  onSubmit(){
    this.productsrv.onProductSave(this.productObj).subscribe((res:any)=>{
      this.toast.success("Product added successfully");
      this.isSidePanelVisible=false;
      this.getAllProducts();
    })
  }
  
  onDelete(productId:any){
    this.productsrv.deleteProduct(productId).subscribe((res:any)=>{
      this.toast.success("Deleted successfully");
      this.getAllProducts();
    })
  }
}
