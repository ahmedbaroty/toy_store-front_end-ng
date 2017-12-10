import {Component, OnInit} from '@angular/core';
import {BasketService} from '../service/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  orderList;
  totalPrice = 0;

  constructor(private basketService: BasketService) {
    this.updateView();
  }

  ngOnInit() {
  }

  increaseButtonPressed(productId, count) {
    this.basketService
      .updateProductCount(productId, count + 1)
      .then(() => {
        this.updateView();
        return;
      }).catch((error) => {
      alert('Error Message\n' + error);
    });
  }

  decreaseButtonPressed(productId, count) {
    this.basketService
      .updateProductCount(productId, count - 1)
      .then(() => {
        this.updateView();
        return;
      }).catch((error) => {
      alert('Error Message\n' + error);
    });
  }

  updateView() {
    this.orderList = this.basketService.orderList;
    this.totalPrice = this.basketService.getTotalPrice();
  }

  deleteOrderItem(productId) {
    this.basketService.deleteProduct(productId)
      .then(() => {
        this.updateView();
      }).catch((error) => {
      alert('Error Message\n' + error);
    });
  }

  submit() {
  //  insert to db
  //  update the availableStock of each product

  }
}
