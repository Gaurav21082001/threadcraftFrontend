import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  getAllCategory() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }
  createCategory(obj:any){
    
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_CATEGORY, obj,{observe:'response' });
  }
  updateCategory(categoryId:any,categoryObj:any){
    
    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_CATEGORY+`/${categoryId}`,categoryObj,{ observe:'response' });
   
  }
  deleteCategory(categoryId:any){
   
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.DELETE_CATEGORY+`/${categoryId}`,{ observe:'response' });
   
  }
}
