import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';
import {LoggingService} from '../../service/logging.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories: any = [];
  filterText = '';
  isLogin: Boolean = false;
  loading = true;

  constructor(private categoryService: CategoryService,
              private router: Router, private loggingService: LoggingService) {
    this.isLogin = this.loggingService.isLogin;
  }

  ngOnInit() {
    this.categoryService.getCategories().then(() => {
      this.loading = false;
      this.categories = this.categoryService.categories;
    }).catch((error) => {
      alert('SERVER LOADING CATEGORIES ERROR\n' + error.message);
    });
  }

  onSelectCategory(category) {
    this.router.navigate(['category', category.categoryId, 1]);
  }

  addCategory() {
    this.router.navigate(['categoryAdd']);
  }
}
