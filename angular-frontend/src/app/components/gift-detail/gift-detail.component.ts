import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent {
  @Input() gift!: Gift;
  @Output() closeEvent = new EventEmitter<void>();
  url = '';
  quantity = 1;

  constructor(private storeService: StoreService, private router: Router) {
    this.url = this.storeService.getUrl();
  }

  close() {
    this.closeEvent.emit();
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCartWithQuantity() {
    for (let i = 0; i < this.quantity; i++) {
      this.storeService.addToCart(this.gift._id);
    }
    this.close();
    this.router.navigate(['/cart']);
  }
}
