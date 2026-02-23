import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gift, CartItems } from '../models/gift.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private url = 'http://localhost:4000';
  private cartItemsSubject = new BehaviorSubject<CartItems>({});
  private tokenSubject = new BehaviorSubject<string>('');
  private giftListSubject = new BehaviorSubject<Gift[]>([]);
  private searchQuerySubject = new BehaviorSubject<string>('');
  private showLoginSubject = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItemsSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  giftList$ = this.giftListSubject.asObservable();
  searchQuery$ = this.searchQuerySubject.asObservable();
  showLogin$ = this.showLoginSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private async loadData() {
    await this.fetchGiftList();
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  async fetchGiftList() {
    this.http.get<any>(`${this.url}/api/gift/list`).subscribe(response => {
      this.giftListSubject.next(response.data);
    });
  }

  addToCart(itemId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showLoginSubject.next(true);
      return;
    }
    const currentCart = this.cartItemsSubject.value;
    if (!currentCart[itemId]) {
      currentCart[itemId] = 1;
    } else {
      currentCart[itemId]++;
    }
    this.cartItemsSubject.next({ ...currentCart });
  }

  removeFromCart(itemId: string) {
    const currentCart = this.cartItemsSubject.value;
    if (currentCart[itemId] > 0) {
      currentCart[itemId]--;
    }
    this.cartItemsSubject.next({ ...currentCart });
  }

  getTotalCartAmount(): number {
    const cartItems = this.cartItemsSubject.value;
    const giftList = this.giftListSubject.value;
    let totalAmount = 0;
    
    for (const item in cartItems) {
      if (cartItems[item]) {
        const itemInfo = giftList.find(product => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.tokenSubject.value;
  }

  getUrl(): string {
    return this.url;
  }

  getCartItems(): CartItems {
    return this.cartItemsSubject.value;
  }

  getGiftList(): Gift[] {
    return this.giftListSubject.value;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/api/user/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.url}/api/user/register`, data);
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query.toLowerCase());
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }

  clearCart() {
    this.cartItemsSubject.next({});
  }

  async loadCartFromBackend() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${this.url}/api/cart/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (data.success) {
        this.cartItemsSubject.next(data.cartData);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }
}
