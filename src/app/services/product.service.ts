import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../components/models/product.model';
import { Constant } from './constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS);
  }

  getProductByCategoryId(categoryId: any):Observable<Product[]> {
    return this.http.get<Product[]>(Constant.API_END_POINT + Constant.METHODS.GET_PRODUCTS_BY_CATEGORY + `/GetAllProductsByCategoryId?categoryId=${categoryId}`);
  }

  getProductById(obj: any):Observable<Product> {
    return this.http.get<Product>(Constant.API_END_POINT + `Products/${obj}`);
  }
  updateProduct(productId: Number, obj: any) {
   

    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT + `/${productId}`, obj);
  }

  deleteProduct(productId: any) {
    
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + `/${productId}`, { observe: 'response' });
  }
  onProductSave(obj: any) {
   
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT, obj,{ observe:'response' });
  }

  searchProduct(searchString: string):Observable<Product[]> {
   
    return this.http.get<Product[]>(Constant.API_END_POINT + Constant.METHODS.SEARCH_PRODUCT + `/search/${searchString}`);
  }
}
