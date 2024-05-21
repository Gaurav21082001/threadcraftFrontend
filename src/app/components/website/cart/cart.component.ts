import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private route:Router,private cartService:CartService,private productsrv :ProductService,private toast:ToastrService){}

  cartItems:any=[];
  quantityOfProduct:any;
 

  async ngOnInit(): Promise<void> {
    await this.getAllCartItems();
    this.cartItemsSummary();
   
  }

  getAllCartItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cartService.getAllCartItems().subscribe((res:any)=>{
        this.cartItems=res;
        this.AssignProduct();
        resolve(res);
      }
      )
    });
  }
  

  AssignProduct(){
    this.cartItems.forEach((cartItem: any)=> {
      this.productsrv.getProductById(cartItem.productId).subscribe(
        {
          next:(res)=>{
            cartItem.productDetails=res;
          },
          error:(error)=>{
            alert("Error fetching product details : "+error);
          }
        })
        }
      );
  }
  
  onConfirm(){
    this.route.navigate(['/address']);
  }

  onEmptyCart(){
    this.cartService.onEmptyCart().subscribe((res:any)=>{
      this.toast.success("Cart empty !")
    })
    
  }
  async onRemoveItem(productId:any){
    this.cartService.onRemoveItem(productId).subscribe(async (res:any)=>
    {

      this.toast.success("Item deleted successfully");
      await this.getAllCartItems();
      this.cartItemsSummary();
    })
  }

  onDecrementQuantity(productId:any){
    let item=this.cartItems.find((item:any)=>item.productId==productId);

    if(item && item.quantity>0){

      item.quantity=item.quantity-1;
     
      this.cartService.updateItemQuantity(productId,item.quantity).subscribe((res:any)=>{
        this.cartItemsSummary();
      })
      if(item.quantity==0)
      {
        this.onRemoveItem(productId);
      }
    }
  }

  onIncrementQuantity(productId:Number){
    let item=this.cartItems.find((item:any)=>item.productId==productId);
    
    if(item){
      if(item.productDetails.stock>item.quantity){
        item.quantity=item.quantity+1;
        // if(item.productDetails.stock>)
        this.cartService.updateItemQuantity(productId,item.quantity).subscribe((res:any)=>{
         this.cartItemsSummary();
        })
      }else{
      this.toast.warning("Product out of stock");
      }
      
    }
  }

totalAmount:any;
  cartItemsSummary(){
    let totalprice=0;
    this.cartItems.forEach((cartItem: any)=> {
      
      let itemTotal=cartItem.quantity*cartItem.unitPrice;
      console.log(itemTotal);
       totalprice=totalprice+itemTotal;
    })
    this.totalAmount=totalprice;
  }
}
