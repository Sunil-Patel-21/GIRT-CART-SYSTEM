import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  url: string;

  constructor(private storeService: StoreService) {
    this.url = this.storeService.getUrl();
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  async fetchOrders() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${this.url}/api/order/userorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (data.success) {
        this.orders = data.data.reverse();
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
}
