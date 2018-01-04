import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../service/logging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  user;
  orderList = [];

  constructor(private loggingService: LoggingService, private router: Router) {
    if (!this.loggingService.isLogin) {
      this.router.navigate(['/']);
    }
    this.user = this.loggingService.getUser();
    for (const order of this.user.orderList) {
      let totalPrice = 0;
      for (const product of order.productList) {
        totalPrice += product.price;
      }
      const customOrder = {
        productList: order.productList,
        localDate: order.localDate,
        localTime: order.localTime,
        totalPrice: totalPrice
      };
      this.orderList.push(customOrder);
    }
  }

  ngOnInit() {
  }

}
