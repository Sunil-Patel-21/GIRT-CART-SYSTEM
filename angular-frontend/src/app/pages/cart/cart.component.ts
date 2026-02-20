import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = {};
  giftList: Gift[] = [];
  url = '';

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
    this.url = this.storeService.getUrl();
  }

  ngOnInit() {
    this.storeService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.storeService.giftList$.subscribe(gifts => {
      this.giftList = gifts;
    });
  }

  removeFromCart(itemId: string) {
    this.storeService.removeFromCart(itemId);
  }

  getTotalCartAmount(): number {
    return this.storeService.getTotalCartAmount();
  }

  proceedToCheckout() {
    this.router.navigate(['/order']);
  }
}
