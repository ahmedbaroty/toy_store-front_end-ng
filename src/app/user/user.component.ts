import {Component, OnInit, ViewChild} from '@angular/core';
import {LoggingService} from '../service/logging.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('f') updateForm: NgForm;
  genders = ['Male', 'Female'];
  questions = ['Your First Pet ?', 'Your First teacher ?', 'Your Best Writer ?',
    'Your Best Book ?'];
  user: {
    userId: number,
    username: string,
    email: string,
    password: string,
    gender: string,
    question: string,
    answer: string
  };

  userEdit = false;
  loading = false;
  constructor(private loggingService: LoggingService, private router: Router) {
    this.user = this.loggingService.getUser();
    this.loggingService.userUpdate.subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      }
    );

    if (this.user === null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  editUser() {
    this.userEdit = !this.userEdit;
  }

  onSubmit() {
    this.loading = true;
    const newUser = {
      userId: this.user.userId,
      username: this.updateForm.value.username,
      email: this.user.email,
      password: this.updateForm.value.password,
      gender: this.updateForm.value.gender,
      question: this.updateForm.value.question,
      answer: this.updateForm.value.answer
    };

    this.loggingService.updateUserData(newUser).then((response: {
      userId: number,
      username: string,
      email: string,
      password: string,
      gender: string,
      question: string,
      answer: string
    }) => {
      this.loading = false;
      this.loggingService.userUpdate.emit(response);
      this.router.navigate(['/']);
      this.userEdit = false;
    }).catch((error) => {
      this.router.navigate(['/']);
    });

  }
}
