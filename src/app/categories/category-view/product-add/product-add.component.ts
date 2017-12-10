import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {

  @ViewChild('f') productForm: NgForm;
  loading = false;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  resetButton() {
    this.productForm.reset();
  }

  getName() {
    return this.activatedRoute.snapshot.params['name'];
  }

  onSubmit() {
    this.loading = true;
    const product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      availableStock: this.productForm.value.availableStock,
      categoryId: +this.activatedRoute.snapshot.params['id']
    };
    console.log('product to add');
    console.log(product);
    this.productService.addProduct(product)
      .then(() => {
      this.loading = false;
        this.router.navigate(['/category',
          +this.activatedRoute.snapshot.params['id'], 2]);
      }).catch((error) => {
      alert('ADD PRODUCT ERROR :\n' + error.message);
    });
  }
}
