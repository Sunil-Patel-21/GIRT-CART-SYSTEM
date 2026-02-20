import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: PlaceOrderComponent },
  { path: 'myorders', component: MyOrdersComponent }
];
