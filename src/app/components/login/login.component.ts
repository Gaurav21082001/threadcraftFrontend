import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    email: "",
    password: ""
  }



  constructor(private route: Router, private authsrv: AuthService, private cookie: CookieService, private toast: ToastrService) {

  }

  user:any;
  onLogin() {
    if (this.loginObj.email == '') {
      this.toast.warning("Please enter email");
    }
    else if (this.loginObj.password == '') {
      this.toast.warning("Please enter password");
    }
    else {
      this.authsrv.login(this.loginObj).subscribe({
       next: (response) => {

          if (response != null) {
            this.cookie.set('Authorization', `Bearer ${response.token}`,
              undefined, '/', undefined, true, 'Strict');
            this.authsrv.decodeToken(response.token)
            this.authsrv.user().subscribe({
              next:response=>{
                this.user=response;
              }
            });
            console.log(this.user);
            if (this.user.role == 'Admin') {
              this.toast.success("Login Admin successfully");
              this.route.navigate(['/admin/products']);
            } else if (this.user.role == 'Customer') {
              this.toast.success("Login User successfully");
              this.route.navigate(['/']);
            }
          } else {
            this.toast.error("Please check credentials");
          }
        },
        error:(error)=>{
          alert(error);
          console.log(error);
        }
        
    })
    }

  }



}
