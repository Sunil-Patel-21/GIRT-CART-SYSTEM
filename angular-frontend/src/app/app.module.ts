import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ExploreMenuComponent } from './components/explore-menu/explore-menu.component';
import { GiftDisplayComponent } from './components/gift-display/gift-display.component';
import { GiftItemComponent } from './components/gift-item/gift-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ExploreMenuComponent,
    GiftDisplayComponent,
    GiftItemComponent,
    FooterComponent,
    LoginPopupComponent,
    HomeComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
