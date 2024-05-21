import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getMyOrders(){
   
   return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_MY_ORDERS);
  }

  updateStatus(orderId:any,status:any){
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.UPDATE_ORDER_STATUS+`?orderId=${orderId}&status=${status}`,{});
  }

  getOrderStatus(orderId:any){
    return this.http.get<any>(Constant.API_END_POINT+Constant.METHODS.GET_ORDER_STATUS+`?orderId=${orderId}`);
  }
}
