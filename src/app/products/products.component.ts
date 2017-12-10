import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  filterText = '';
  products = [];
  loading = true;
  constructor(private router: Router,
              private productService: ProductService) {
      this.productService.getAllProducts().then(() => {
      this.products = this.productService.products;
        this.loading = false;
    }).catch((error) => {
      alert('ERROR IN LOADING PRODUCTS FROM THE SERVER :\n' + error.message
      );
        this.loading = false;
    });
  }

  ngOnInit() {
  }

  onSelectProduct(product) {
    this.router.navigate(['/productDetails', product.productId]);
  }
}
