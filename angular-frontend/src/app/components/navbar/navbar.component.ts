import { Component, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() showLoginEvent = new EventEmitter<boolean>();
  menu = 'home';
  token = '';
  totalAmount = 0;
  searchQuery = '';

  constructor(private storeService: StoreService, private router: Router) {
    this.storeService.token$.subscribe(token => this.token = token);
    this.storeService.cartItems$.subscribe(() => {
      this.totalAmount = this.storeService.getTotalCartAmount();
    });
  }

  setMenu(menuItem: string) {
    this.menu = menuItem;
  }

  openLogin() {
    console.log('Sign In button clicked');
    this.showLoginEvent.emit(true);
  }

  logout() {
    this.storeService.setToken('');
    localStorage.removeItem('token');
  }

  goToOrders() {
    this.router.navigate(['/myorders']);
  }

  onSearch() {
    this.storeService.setSearchQuery(this.searchQuery);
  }

  onSearchEnter() {
    this.onSearch();
    const element = document.getElementById('gift-display');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
