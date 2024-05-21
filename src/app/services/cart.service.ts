import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  getAllCartItems() {
   
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CART_ITEMS);
  }

  updateItemQuantity(productId: Number, quantity: Number) {
    

    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_ITEM_QUANTITY + `/${productId}`, quantity);
  }
  onRemoveItem(obj: any) {
    
   return this.http.delete(Constant.API_END_POINT + Constant.METHODS.REMOVE_ITEM + `/${obj}`, { observe: 'response' });
  }
  onAddToCart(obj: any) {
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART + `/${obj}`, {});
  }

  onAddOrder() {
   
   return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_ORDER,{});
  }

  onEmptyCart(){
    
   return this.http.delete(Constant.API_END_POINT + Constant.METHODS.EMPTY_CART, {observe: 'response' });
  }

  onAddOrderItems(orderId:any){
  
   
  return  this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_ORDER_ITEMS+`/${orderId}`,{observe:'response'});
    
  }
  getAllOrders(){
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_ORDERS);
  }
}
