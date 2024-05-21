import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
 constructor(private cookiesrv:CookieService){}
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const myToken=this.cookiesrv.get('Authorization');
  const authReq= req.clone({ setHeaders: {  'Authorization':  `${myToken}`  } });
  return next.handle(authReq);
 }

};
