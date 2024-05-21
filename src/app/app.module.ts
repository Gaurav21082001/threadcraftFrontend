import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/website/products/products.component';
import { SearchProductComponent } from './components/website/search-product/search-product.component';
import { CategoryProductComponent } from './components/website/category-product/category-product.component';
import { CartComponent } from './components/website/cart/cart.component';
import { ProductDetailsComponent } from './components/website/product-details/product-details.component';
import { OrderItemsComponent } from './components/website/order-items/order-items.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/website/home/home.component';
import { tokenInterceptor } from './services/token.interceptor';
import { AddressComponent } from './components/website/address/address.component';
import { AdminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './components/website/forbidden/forbidden.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatSelectModule } from '@angular/material/select';
import { Home2Component } from './components/website/home2/home2.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent,
    AdminCategoryComponent,
    AdminCustomersComponent,
    AdminOrdersComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProductsComponent,
    SearchProductComponent,
    CategoryProductComponent,
    CartComponent,
    ProductDetailsComponent,
    OrderItemsComponent,
    HomeComponent,
    AddressComponent,
    ForbiddenComponent,
    Home2Component,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true
    },

    AdminGuard,
    authGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
