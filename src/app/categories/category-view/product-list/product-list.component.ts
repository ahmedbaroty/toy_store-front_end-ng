import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  filterText = '';
  @Input () products = [];
  @Input() category = {categoryId: -1, name: '', description: ''};
  @Input() isLogin;
  constructor(private router: Router) {
  }

  ngOnInit() {
      }

  addProduct() {
    this.router.navigate(['/productAdd', this.category.categoryId, this.category.name]);
  }

  onSelectProduct(product) {
     this.router.navigate(['/productDetails', product.productId]);
  }
}
