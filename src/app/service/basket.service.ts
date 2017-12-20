import {Injectable} from '@angular/core';

@Injectable()
export class BasketService {
  /*orderList: [
    {
      product: { productId: number, name: string, description: string, availableStock: number, price: number },
      count: number
    }];
*/
  orderList = [];

  constructor() {
  }

  updateProductCount(productId: number, newCount: number) {
    return new Promise((resolve, reject) => {
      // get the order
      for (let i = 0; i < this.orderList.length; i++) {
        if (productId === this.orderList[i].product.productId) {
          this.orderList[i].product.availableStock += this.orderList[i].count;
          if (this.orderList[i].product.availableStock >= newCount) {
            this.orderList[i].product.availableStock -= newCount;
            this.orderList[i].count = newCount;
            resolve();
          } else {
            this.orderList[i].product.availableStock -= this.orderList[i].count;
            reject('available stock for this product is shortage');
          }
          return;
        }
      }
    });
  }

  deleteProduct(productId: number) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].product.productId === productId) {
          this.orderList.splice(i, 1);
          resolve();
          return;
        }
      }
      reject('product not found');
    });
  }

  addProduct(product: {
    productId: number,
    name: string,
    description: string,
    availableStock: number,
    price: number,
    categoryId: number
  }) {
    return new Promise((resolve, reject) => {
      if (product.availableStock >= 1) {
        --product.availableStock;
        this.orderList.push({product: product, count: 1});
        resolve();
      } else {
        reject('can\'t add product because available stock < 1');
      }
    });
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const order of this.orderList) {
      totalPrice += (order.product.price * order.count);
    }
    return totalPrice;
  }
}
