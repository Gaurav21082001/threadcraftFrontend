import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent {
  customerList:any=[];
  ngOnInit(): void {
    this.getAllCustomers();
  }
  constructor(private authService : AuthService){}
  
  getAllCustomers(){
    this.authService.getAllCustomers().subscribe((res:any)=>{
      this.customerList=res;
      console.log(res);
    })
  }
}
