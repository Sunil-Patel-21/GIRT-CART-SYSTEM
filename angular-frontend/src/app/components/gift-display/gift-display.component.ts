import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-gift-display',
  templateUrl: './gift-display.component.html',
  styleUrls: ['./gift-display.component.css']
})
export class GiftDisplayComponent implements OnInit {
  @Input() category: string = 'All';
  giftList: Gift[] = [];
  searchQuery: string = '';

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.giftList$.subscribe(gifts => {
      this.giftList = gifts;
    });
    this.storeService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  shouldDisplay(gift: Gift): boolean {
    const matchesCategory = this.category === 'All' || this.category === gift.category;
    const matchesSearch = !this.searchQuery || 
      gift.name.toLowerCase().includes(this.searchQuery) ||
      gift.category.toLowerCase().includes(this.searchQuery);
    return matchesCategory && matchesSearch;
  }
}
