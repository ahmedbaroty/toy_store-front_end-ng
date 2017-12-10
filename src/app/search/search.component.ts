import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchBy = 'All';
  searchFor = '';
  categories: any = [];
  products: any = [];
  allObjects: any = [];
  loading = true;

  constructor(private productService: ProductService,
              private categoryService: CategoryService, private router: Router) {

    this.categoryService.getCategories().then(() => {
      this.categories = this.categoryService.categories;
      for (const c of this.categories) {
        this.allObjects.push(c);
      }
    }).catch((error) => {
      this.loading = false;
      alert('Categories NETWORK ERROR\n' + error.message);
    });

    this.productService.getAllProducts().then(() => {
      this.products = this.productService.products;
      this.loading = false;
      for (const p of this.products) {
        this.allObjects.push(p);
      }
    }).catch((error) => {
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  onSelectObject(obj) {
    if (obj.productId) {
      this.router.navigate(['/productDetails']);
    } else {
      this.router.navigate(['category', obj.categoryId, 1]);
    }
  }
}
