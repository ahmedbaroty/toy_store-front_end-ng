import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class OrderService implements OnInit {

  constructor(private http: Http) {
  }

  ngOnInit(): void {
  }

  addOrder(userId: number,
           orderList: [
             {
               product: { productId: number, name: string, description: string, availableStock: number, price: number },
               count: number
             }]) {

    const productList = [];
    for (const order of orderList) {
      for (let i = 0; i < order.count; i++) {
        productList.push(order.product.productId);
      }
    }
    const body = {
      userId: userId,
      productList: productList
    };
    console.log(productList);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/api/order', body)
        .toPromise()
        .then((response) => {
          resolve(response.json());
        }).catch((error) => {
        reject(error);
      });
    });
  }
}
