import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ProductService {
  products = [];
  product;
  constructor(private http: Http) {
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/products')
        .toPromise()
        .then((response) => {
          this.products = response.json();
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }

  getProductsByCategoryId(categoryId: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:8080/products/${categoryId}`)
        .toPromise()
        .then((response) => {
          this.products = response.json();
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }

  updateProduct(product) {
    return new Promise((resolve, reject) => {
      console.log(product);
      this.http.put('http://localhost:8080/products/update', product)
        .toPromise()
        .then(() => {
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`http://localhost:8080/products/delete/${productId}`)
        .toPromise()
        .then(() => {
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/products/add', product)
        .toPromise()
        .then(() => {
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }

  getProduct(productId) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:8080//products/product/${productId}`)
        .toPromise()
        .then((response) => {
          this.product = response.json();
          resolve();
        }).catch((error) => {
        reject(error);
      });
    });
  }
}
