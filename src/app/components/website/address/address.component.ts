import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {OnInit} from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit{
  addressObj:any={
    'email':"",
    'name':"",
    'country':'',
    'streetAddress':'',
    'city':'',
    'postalCode':'',
    'state':''
  }
  setAddressObj:any={
    'address':''
  }
  constructor(private authService:AuthService,private cartService:CartService,private toast:ToastrService,private route:Router){}
  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails(){
    this.authService.getUserDetails().subscribe((res:any)=>{
      this.addressObj=res;
    })
  }
  
    setUserAddress(){
      if(this.isValidAddress()){
      this.setAddressObj.address=`${this.addressObj.streetAddress} ${this.addressObj.city} ${this.addressObj.postalCode} ${this.addressObj.state} ${this.addressObj.country}`;
      this.authService.setUserAddress(this.setAddressObj.address).subscribe((res:any)=>{
        this.onCheckOut();
      })
    }
  }
  

  orderId:any
  onCheckOut(){
    this.cartService.onAddOrder().subscribe((res:any)=>{
      this.orderId=res.orderId;
      console.log(this.orderId);
      this.onAddOrderItems(this.orderId);
    })
     
   
    
    
  }
  onAddOrderItems(orderId:any){
    this.cartService.onAddOrderItems(orderId).subscribe((res:any)=>{
      this.toast.success("Order Confirmed");
      this.onEmptyCart();
      this.route.navigate(['order_items']);
    })
  }
  onEmptyCart(){
    this.cartService.onEmptyCart().subscribe((res:any)=>{
      this.toast.success("Cart empty !")
    })
    
  }
  isValidAddress(){
    let isValid=true;
    if(this.addressObj.country == undefined || this.addressObj.streetAddress == undefined || this.addressObj.city == undefined || this.addressObj.postalCode == undefined ||this.addressObj.state == undefined){
      this.toast.warning("All fields are mandatory");
      isValid=false;
    }
    return isValid;
  }
}
