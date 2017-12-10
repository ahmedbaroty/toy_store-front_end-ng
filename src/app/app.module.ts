import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {CategoryDetailComponent} from './categories/category-view/category-detail/category-detail.component';
import {ProductListComponent} from './categories/category-view/product-list/product-list.component';
import {ProductDetailComponent} from './categories/category-view/product-detail/product-detail.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search/search.component';
import {AppRoutingModule} from './app-routing.module';
import {UserComponent} from './user/user.component';
import {CategoryAddComponent} from './categories/category-add/category-add.component';
import {ProductAddComponent} from './categories/category-view/product-add/product-add.component';
import {HomePageComponent} from './home-page/home-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {LoggingService} from './service/logging.service';
import {FilterPipe} from './pipe/filter.pipe';
import {CategoryViewComponent} from './categories/category-view/category-view.component';
import {CategoryService} from './service/category.service';
import {ProductService} from './service/product.service';
import {ProductsComponent} from './products/products.component';
import {AuthGuardService} from './service/auth.guard.service';
import { BasketComponent } from './basket/basket.component';
import {BasketService} from './service/basket.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    ProductListComponent,
    ProductDetailComponent,
    SignupComponent,
    LoginComponent,
    SearchComponent,
    UserComponent,
    CategoryAddComponent,
    ProductAddComponent,
    HomePageComponent,
    NotFoundPageComponent,
    ContactUsComponent,
    FilterPipe,
    CategoryViewComponent,
    ProductsComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule],
  providers: [AppComponent,
    LoggingService,
    CategoryService,
    ProductService , AuthGuardService , BasketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
