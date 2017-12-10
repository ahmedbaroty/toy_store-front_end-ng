import {Component, OnInit, ViewChild} from '@angular/core';
import {LoggingService} from '../service/logging.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  submit = false;
  constructor(private loggingService: LoggingService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submit = true;
    this.loggingService.loginUser(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).then(() => {
      this.loggingService.loginStatus.emit(true);
      this.submit = false;
      this.router.navigate(['/']);
    }).catch((error) => {
      alert('Login Error \n' + error.message);
      this.submit = false;
    });
  }
}
