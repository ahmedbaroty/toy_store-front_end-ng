import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class LoggingService {
  private user;

  userUpdate = new EventEmitter<{
    userId: number,
    username: string,
    email: string,
    password: string,
    gender: string,
    question: string,
    answer: string
  }>();

  loginStatus = new EventEmitter<boolean>();
  isLogin = false;

  constructor(private http: Http) {
  }

  loginUser(loginUser: { email: string, password: string }) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/user/login', loginUser)
        .toPromise()
        .then((response) => {
          this.user = response.json();
          this.isLogin = true;
          this.loginStatus.emit(true);
          this.userUpdate.emit(response.json());
          resolve();
        }).catch((error) => {
        this.loginStatus.emit(false);
        this.isLogin = false;
        reject(error);
      });
    });
  }

  signupUser(user: {
    username: string,
    email: string,
    password: string,
    gender: string,
    question: string,
    answer: string
  }) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/user/add', user)
        .toPromise()
        .then((response) => {
          // this.user = response.json();
          // this.isLogin = true;
          // this.loginStatus.emit(true);
          // this.userUpdate.emit(response.json());
          resolve();
        }).catch((error) => {
        // this.loginStatus.emit(false);
        // this.isLogin = false;
        reject(error);
      });
    });
  }

  updateUserData(newUser: {
    userId: number
    username: string,
    email: string,
    password: string,
    gender: string,
    question: string,
    answer: string
  }) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/user/update', newUser)
        .toPromise()
        .then((response) => {
          this.userUpdate.emit(response.json());
          this.user = response.json();
          resolve(response.json());
        }).catch((error) => {
        reject(error);
      });
    });

  }

  logout() {
    this.isLogin = false;
    this.user = null;
    this.userUpdate.emit(null);
    this.loginStatus.emit(false);
  }

  getUser() {
    return this.user;
  }

  refreshUser() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/user/' + this.user.userId)
        .toPromise()
        .then((response) => {
          this.user = response.json();
          this.userUpdate.emit(response.json());
          resolve();
        }).catch((error) => {
        this.loginStatus.emit(false);
        this.isLogin = false;
        reject(error);
      });
    });
  }
}
