import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../service/logging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login = false;
  user: {
    userId: number,
    username: string,
    email: string,
    password: string,
    question: string,
    answer: string
  } = null;

  constructor(private loggingService: LoggingService , private router: Router) {
    this.loggingService.userUpdate.subscribe(
      (currentUser: {
        userId: number,
        username: string,
        email: string,
        password: string,
        question: string,
        answer: string
      }) => this.user = currentUser
    );

    this.loggingService.loginStatus.subscribe(
      (isLogin: boolean) => this.login = isLogin);
  }

  logout() {
    this.loggingService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }
}
