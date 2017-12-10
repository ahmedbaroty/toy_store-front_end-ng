import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggingService} from '../../../service/logging.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('f') productForm: NgForm;
  onUpdate = false;
  product = {
    productId: -1,
    name: '',
    price: -1,
    description: '',
    availableStock: -1,
    categoryId: -1
  };
  loading = false;
  isLogin = false;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loggingService: LoggingService) {
    this.isLogin = this.loggingService.isLogin;
    this.productService.getProduct(+this.activatedRoute.snapshot.params['id'])
      .then(() => {
        this.product = this.productService.product;
      }).catch((error) => {
      alert('GET PRODUCT ERROR : \n' + error.message);
    });
  }

  ngOnInit() {
  }

  updateButton() {
    this.onUpdate = true;
  }

  onSubmit() {
    this.loading = true;
    const product = {
      productId: this.product.productId,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      availableStock: this.productForm.value.availableStock,
      categoryId: this.product.categoryId
    };
    this.productService.updateProduct(product)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/category', this.product.categoryId, 2]);
      }).catch((error) => {
      alert('UPDATE PRODUCT ERROR: \n' + error.message);
      this.loading = false;
    });
  }

  deleteButton() {
    this.loading = true;
    this.productService.deleteProduct(this.product.productId)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/category', this.product.categoryId, 2]);
      }).catch((error) => {
      alert('DELETE PRODUCT ERROR: \n' + error.message);
    });
  }
}
