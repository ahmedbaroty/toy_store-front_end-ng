import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../service/category.service';
// import {ProductService} from '../../service/product.service';
import {LoggingService} from '../../service/logging.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  categoryId = -1;
  category: any;
  onDetails = true;
  onProducts = false;
  products = [];
  loading = true;
  loading_category = false;
  loading_products = false;
  isLogin = false;

  constructor(private activatedRouter: ActivatedRoute,
              private categoryService: CategoryService,
        //      private productService: ProductService,
              private loggingService: LoggingService) {
    this.isLogin = this.loggingService.isLogin;
    this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.categoryId = +params['id'];
        this.categoryService
          .getCategory(this.categoryId)
          .then((response) => {
            this.category = response;
            this.products = this.category.productList;
            this.loading_category = true;
            this.loading = (this.loading_category && this.loading_products);
          }).catch((error) => {
          alert('Category Not Found Network Error' + error.message);
        });
        // this.productService.getProductsByCategoryId(this.categoryId)
        //   .then(() => {
        //     this.products = this.productService.products;
        //     this.loading = (this.loading_category && this.loading_products);
        //   }).catch((error) => {
        //   alert('PRODUCTS LIST ERROR: \n' + error.message);
        // });
      });
  }

  ngOnInit() {
    this.categoryId = this.activatedRouter.snapshot.params['id'];
    if (this.activatedRouter.snapshot.params['view'] === '1') {
      this.onDetails = true;
      this.onProducts = false;
    } else {
      this.onDetails = false;
      this.onProducts = true;
    }
  }

  onDetailsClick() {
    this.onDetails = true;
    this.onProducts = false;
  }

  onProductsClick() {
    this.onDetails = false;
    this.onProducts = true;
  }
}
