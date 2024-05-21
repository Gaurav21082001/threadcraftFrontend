import { Component,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { AuthUser } from '../models/auth.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user:any;
  
  categoryList:any=[];
  searchString:string="";
  constructor(public authService:AuthService,private router:Router,private cateService:CategoryService){}

  ngOnInit(): void {

    this.user=localStorage.getItem('email');
    console.log(this.user);
      this.getAllCategory();
  }
  onLogout():void{
    this.authService.logout();
    this.router.navigate(['/']);
  
  }
  getAllCategory(){
    this.cateService.getAllCategory().subscribe((res:any)=>{
      this.categoryList=res;
    })
  }

  searchProducts(){
    this.router.navigate([`/search/products/${this.searchString}`])  
  }
}
