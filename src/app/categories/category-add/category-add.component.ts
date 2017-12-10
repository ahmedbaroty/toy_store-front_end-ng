import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  @ViewChild('f') categoryForm: NgForm;
  loading = false;
  constructor(private categoryService: CategoryService , private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    const newCategory = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };
    this.categoryService.addCategory(newCategory).then((response) => {
      this.loading = false;
      this.router.navigate(['/categories']);
    }).catch((error) => {
      alert('ADD CATEGORY ERROR :\n' + error.message);
    });
  }

  resetButton() {
    this.categoryForm.reset();
  }
}
