import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../../service/category.service';
import {NgForm} from '@angular/forms';
import {LoggingService} from '../../../service/logging.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})

export class CategoryDetailComponent implements OnInit {
  @ViewChild('f') updateCategory: NgForm;
  @Input() categoryId;
  @Input() category = {categoryId: -1, name: '', description: ''};
  onUpdate = false;
  loading = false;
  @Input() isLogin;
  constructor(private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  updateButton() {
    this.onUpdate = true;
  }

  onSubmit() {
    this.loading = true;
    const category = {
      categoryId: this.category.categoryId,
      name: this.updateCategory.value.name,
      description: this.updateCategory.value.description
    };

    this.categoryService.updateCategory(category).then((response: {
      categoryId: number, name: string, description: string
    }) => {
      this.loading = false;
      this.categoryService.category = response;
      this.router.navigate(['/categories']);
    }).catch((error) => {
      alert('update category error: \n' + error.message);
    });
  }

  deleteButton() {
    this.loading = true;
    this.categoryService
      .deleteCategory(this.category.categoryId)
      .then(() => {
      this.loading = false;
        this.router.navigate(['/categories']);
      }).catch((error) => {
      alert('Delete Error Message : \n' + error.message);
    });
  }
}
