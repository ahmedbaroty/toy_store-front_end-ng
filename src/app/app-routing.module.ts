import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CategoriesComponent} from './categories/categories.component';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UserComponent} from './user/user.component';
import {CategoryAddComponent} from './categories/category-add/category-add.component';
import {CategoryViewComponent} from './categories/category-view/category-view.component';
import {ProductDetailComponent} from './categories/category-view/product-detail/product-detail.component';
import {ProductAddComponent} from './categories/category-view/product-add/product-add.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ProductsComponent} from './products/products.component';
import {AuthGuardService} from './service/auth.guard.service';
import {BasketComponent} from './basket/basket.component';

const appRouting: Routes = [
  {path: 'productDetails/:id', component: ProductDetailComponent},
  {path: 'productAdd/:id/:name', canActivate: [AuthGuardService], component: ProductAddComponent},
  {path: 'category/:id/:view', component: CategoryViewComponent},
  {path: 'categoryAdd', canActivate: [AuthGuardService], component: CategoryAddComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component: UserComponent},
  {path: '', component: HomePageComponent},
  {path: 'notFound', component: NotFoundPageComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'basket', component: BasketComponent},
  {path: '**', redirectTo: 'notFound'}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
