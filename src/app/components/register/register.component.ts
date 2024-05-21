import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Signup } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj: Signup = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: ""
  }

  constructor(private authService: AuthService, private route: Router, private toast: ToastrService) { }

  onSubmit() {
    if (this.isFormValidate()) {
      this.authService.register(this.signupObj).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            this.toast.success("Registered successfully");
            this.route.navigate(['/login']);
          },
          error: (error) => {
            this.toast.error("User Already exist");
          }
        })
    }

  }

  isFormValidate() {
    let isValid = true;
    const phoneNumberRegex = /^[9,8,7,6]{1}\d{9}$/; 
    const emailPattern= /^\S+@\S+\.\S+$/;

    if (this.signupObj.name == "" || this.signupObj.name.trim() == "") {
      this.toast.warning("The name is required.");
      isValid = false;
    }
    else if (this.signupObj.email == "" || this.signupObj.email.trim() == "") {
      this.toast.warning("The email is required.");
      isValid = false;
    }
    else if (!emailPattern.test(this.signupObj.email.trim())) {
      this.toast.warning("Check email pattern.");
      isValid = false;
    }
    else if (this.signupObj.password == "" || this.signupObj.password.trim() == "") {
      this.toast.warning("The password is required.");
      isValid = false;
    }
    else if (this.signupObj.password.toString().length<5 ) {

      this.toast.warning("The password length must be 5.");
      isValid = false;
    }
    else if (this.signupObj.confirmPassword == "" || this.signupObj.confirmPassword.trim() == "") {
      this.toast.warning("The confirm password is required.");
      isValid = false;
    }
    else if (this.signupObj.password != this.signupObj.confirmPassword) {
      this.toast.warning("The password and confirm password should be match.");
      isValid = false;
    }
    else if (this.signupObj.phoneNumber == "" || this.signupObj.phoneNumber.trim() == "" ) {
      this.toast.warning("The phone number is required.");
      isValid = false;
    }
    else if (!phoneNumberRegex.test(this.signupObj.phoneNumber)) {
      this.toast.warning("Check phone number pattern.");
      isValid = false;
    }
    return isValid;
  }
}
