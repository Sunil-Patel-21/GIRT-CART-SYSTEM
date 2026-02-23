import { Component, Input } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent {
  @Input() gift!: Gift;
  cartItems: any = {};
  url = '';
  showDetail = false;

  constructor(private storeService: StoreService) {
    this.url = this.storeService.getUrl();
    this.storeService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTruncatedDescription(): string {
    const words = this.gift.description.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return this.gift.description;
  }

  openDetail() {
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
  }

  addToCart() {
    this.storeService.addToCart(this.gift._id);
  }

  removeFromCart() {
    this.storeService.removeFromCart(this.gift._id);
  }

  getItemCount(): number {
    return this.cartItems[this.gift._id] || 0;
  }
}
