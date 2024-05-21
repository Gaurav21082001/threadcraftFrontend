import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {
  groupedOrders:{[Key:string]:any}=[];
  orderStatusList:any=[];
  constructor(private orderService:OrderService){}

   ngOnInit():void {
    this.getMyOrders();
   
   }

  getMyOrders(){
    this.orderService.getMyOrders().subscribe((res:any)=>{
    
      let groupedOrders=res.reduce((r:any,a:any)=>{
        r[a.orderId]=[...r[a.orderId] || [] ,a];
        
        return r;
      },{});
      
      this.groupedOrders=groupedOrders;
      this.getOrderStatus();
    })
  }
  
  getOrderStatus(){
   Object.keys(this.groupedOrders).forEach((key: any) => {
      
      this.orderService.getOrderStatus(key).subscribe(
        {
          next:(res:any)=>{
        
            this.groupedOrders[key].forEach((orderItem: any) => {
              orderItem.status = res.status;
            });
            console.log(this.groupedOrders[key]);
          },
          error:error=>{
            alert("Error while getting order status "+error);
          }
        }
        
      )
      
    }
    
    );
    
  
  }
}
