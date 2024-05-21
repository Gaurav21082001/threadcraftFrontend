import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../components/models/login-request.model';
import { LoginResponse } from '../components/models/login-response.model';
import { Constant } from './constant/Constant';
import { Signup } from '../components/models/register.model';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '../components/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 initialUser: any = {
    email: '',
    role: '' 
  };
 $userSubject = new BehaviorSubject<AuthUser | null>(this.initialUser);
   decodedToken: { [key: string]: string; } | undefined;
   $role=new BehaviorSubject<string | undefined>(undefined);
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(Constant.API_END_POINT + Constant.METHODS.LOGIN_USER,request);
  }

  register(request: Signup): Observable<string> {
    return this.http.post<string>(Constant.API_END_POINT + Constant.METHODS.REGISTER_USER, {
      name: request.name,
      email: request.email,
      password: request.password,
      confirmPassword: request.confirmPassword,
      phoneNumber: request.phoneNumber,
      address: request.address
    });
  }

  isLoggedIn(){
    var isExpired = false;
    const token = this.cookieService.get('Authorization');
    const jwtToken=token.slice(7,token.length-1);
    
    if (jwtToken) {
      
      const payload = atob(jwtToken.split('.')[1]);
      
      const parsedPayload = JSON.parse(payload); // convert payload into an Object
      
      isExpired = parsedPayload.exp > Date.now() / 1000; // check if token is expired
      
    }
    return isExpired;
  }

  getAllCustomers(){
      return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_USERS);
    
  }

  getUserDetails(){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_USER_DETAILS);
  }

  setUserAddress(addressObj:any){
    console.log(addressObj);
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.SET_USER_ADDRESS+`?address=${addressObj}`,{});
  }
  decodeToken(token:any){
    this.decodedToken =jwtDecode(token);
    console.log(this.decodedToken);
    this.initialUser.role=this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : undefined;
    this.initialUser.email=this.decodedToken ? this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] : null;
    
    localStorage.setItem('role',this.initialUser.role);
      localStorage.setItem('email',this.initialUser.email);
  }
  isAdmin(){
    if(localStorage.getItem('role')==='Admin'){
      return true;
    }
    
    return false;
  }
  

  user(): Observable<any | undefined> {
    return this.$userSubject.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.initialUser.role=undefined;
    this.$userSubject.next(this.initialUser);
  }
}
