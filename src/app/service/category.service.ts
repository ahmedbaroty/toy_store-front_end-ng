import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class CategoryService {
  categories = [];
  category: { categoryId: number, name: string, description: string };

  constructor(private http: Http) {
  }

  addCategory(category: { name: string, description: string }) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/categories', category)
        .toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getCategory(categoryId: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:8080/categories/${categoryId}`)
        .toPromise()
        .then((response) => {
          this.category = response.json();
          resolve(response.json());
        }).catch((error) => {
        reject(error);
      });
    });
  }

  updateCategory(updatedCategory: { categoryId: number, name: string, description: string }) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/categories/update', updatedCategory)
        .toPromise()
        .then((response) => {
          resolve(response.json());
        }).catch((error) => {
        reject(error);
      });
    });

  }

  deleteCategory(categoryId: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`http://localhost:8080/categories/delete/${categoryId}`)
        .toPromise()
        .then(() => {
          resolve();
        }, (error) => {
          reject(error);
        });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/categories')
        .toPromise()
        .then((response) => {
          this.categories = response.json();
          resolve(response.json());
        }).catch((error) => {
        console.log('get Categories ERROR : ' + error.message);
        reject(error);
      });
    });
  }
}
