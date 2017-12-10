import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoggingService} from '../service/logging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  questions = ['Your First Pet ?', 'Your First teacher ?', 'Your Best Writer ?',
    'Your Best Book ?'];
  genders = ['Male', 'Female'];
  submit = false;
  constructor(private loggingService: LoggingService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submit = true;
    const user = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      gender: this.signupForm.value.gender,
      question: this.signupForm.value.question,
      answer: this.signupForm.value.answer
    };
    this.loggingService.signupUser(user)
      .then(() => {
        this.submit = false;
        this.router.navigate(['/login']);
      }).catch((error) => {
      alert('signup error message\n' + error.message);
      this.router.navigate(['/login']);
      this.submit = false;
    });
  }
}
