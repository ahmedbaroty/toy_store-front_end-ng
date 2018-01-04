import {Component, OnInit} from '@angular/core';
import {BasketService} from '../service/basket.service';
import {OrderService} from '../service/order.service';
import {LoggingService} from '../service/logging.service';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {

  orderList;
  totalPrice = 0;
  makeOrderClicked = false;

  constructor(private basketService: BasketService,
              private orderService: OrderService,
              private loggingService: LoggingService,
              private productService: ProductService,
              private router: Router) {
    if (!this.loggingService.isLogin) {
      this.router.navigate(['/']);
    }
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
    this.makeOrderClicked = true;
    //  insert to db
    //  update the availableStock of each product
    this.orderService.addOrder(
      this.loggingService.getUser().userId,
      this.orderList)
      .then(() => {
        this.loggingService.refreshUser().catch((error) => {
          alert('REFRESH USER ORDERS ERROR : \n' + error.message);
        }).then(() => {
          let count = 0;
          for (const order of this.orderList) {
            console.log(order);
            this.productService.updateProduct(order.product).catch(
              (error) => {
                alert('ERROR IN UPDATE PRODUCTS AVAILABLE COST:\n'
                  + 'product id : ' +
                  order.product.productId + '\n' + error.message);
              }
            ).then(() => {
              count++;
              console.log(count);
              console.log(this.orderList.length);
              if (count === this.orderList.length) {
                this.basketService.orderList = [];
                this.router.navigate(['/orders']);
              }
            });
          }
        }).catch((error) => {
          alert('ADD ORDER ERROR: \n' + error.message);
        });
      });
  }
}
