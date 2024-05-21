import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any;
  constructor(private authService: AuthService, private route: ActivatedRoute, private productsrv: ProductService, private router: Router, private cartservice: CartService,
    private toast: ToastrService) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));
    this.getProductById(productId);
  }
  onAddToCart(productId: string) {
    if (this.authService.isLoggedIn()) {
      this.cartservice.onAddToCart(productId).subscribe(
        {
          next: (res: any) => {
            this.toast.success("Product Added to cart!");
            this.router.navigate(['/cart']);
          },
          error: error => {
            this.toast.error("Error while add to cart " + error);
          }
        }
      )
    }
    else {
      this.toast.error("Please login");
      this.router.navigate(['login']);
    }

  }


  getProductById(productId: any) {
    this.productsrv.getProductById(productId).subscribe(
      {
        next: (res) => {
          this.product = res;
        },
        error: (error) => {
          this.toast.error("Error while fetching product " + error);
        }
      }

    );

  }
}