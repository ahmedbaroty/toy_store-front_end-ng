import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasketService} from '../../../service/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  filterText = '';
  @Input() products = [];
  @Input() category = {categoryId: -1, name: '', description: ''};
  @Input() isLogin;

  constructor(private router: Router, private basketService: BasketService) {
  }

  ngOnInit() {
  }

  addProduct() {
    this.router.navigate(['/productAdd', this.category.categoryId, this.category.name]);
  }

  onSelectProduct(product) {
    this.router.navigate(['/productDetails', product.productId]);
  }

  onBuyProduct(product) {
    product.categoryId = this.category.categoryId;
    this.basketService.addProduct(product).catch(
      (error) => {
        alert(error.message);
      }
    );
  }
}
