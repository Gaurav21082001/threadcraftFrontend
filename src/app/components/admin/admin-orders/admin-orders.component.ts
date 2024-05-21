import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  groupedOrders: {[key:string]:any}=[];
  
  orderList:any=[];
  orderStatusOptions : string[]= ['Pending', 'Shipped', 'Delivered'];
  constructor(private cartService:CartService,private orderService:OrderService,private toast:ToastrService){
    // this.selectedOption="Pending";
  }
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders(){
    this.cartService.getAllOrders().subscribe((res:any)=>{
      console.log(res);
      this.orderList=res;
      // let groupedOrders=res.reduce((r:any,a:any)=>{
      //   r[a.orderId]=[...r[a.orderId] || [] ,a];
      //   return r;
      // },{});
      // console.log(groupedOrders);
      // this.groupedOrders=groupedOrders;
    })
    }
    
    
    onClick(event:Event,orderId:any): void {
      const target = event.target as HTMLInputElement;
      const value = target?.value;
    
      if (value) {
        this.orderService.updateStatus(orderId,value).subscribe((res:any)=>{
          this.toast.success("Status updated ! ");
          this.getAllOrders();
        })
      } else {
        console.log('Value is null or undefined');
      }
    }
   
}
