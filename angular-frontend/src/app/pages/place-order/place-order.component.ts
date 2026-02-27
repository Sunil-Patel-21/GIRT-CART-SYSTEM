import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  data = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  };
  
  isLoading = false;

  constructor(private storeService: StoreService, private router: Router, private toastr: ToastrService) {}

  getTotalCartAmount(): number {
    return this.storeService.getTotalCartAmount();
  }

  async placeOrder(event: Event) {
    event.preventDefault();
    
    if (this.isLoading) return;
    
    // Validate form fields
    if (!this.data.firstName || !this.data.lastName || !this.data.email || 
        !this.data.street || !this.data.city || !this.data.state || 
        !this.data.zipcode || !this.data.country || !this.data.phone) {
      this.toastr.error('Please fill all delivery information fields', 'Validation Error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('Please login to place order', 'Authentication Required');
      return;
    }

    const orderItems: any[] = [];
    const giftList = this.storeService.getGiftList();
    const cartItems = this.storeService.getCartItems();
    
    giftList.forEach((item: any) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item };
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      this.toastr.warning('Your cart is empty', 'Empty Cart');
      return;
    }

    const orderData = {
      address: this.data,
      items: orderItems,
      amount: this.getTotalCartAmount() + 40
    };

    this.isLoading = true;
    
    try {
      const response = await fetch(`${this.storeService.getUrl()}/api/order/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(orderData)
      });
      const result = await response.json();
      
      this.isLoading = false;
      
      if (result.success) {
        await this.storeService.loadCartFromBackend();
        this.toastr.success('Order placed successfully! Confirmation email sent.', 'Success');
        this.router.navigate(['/myorders']);
      } else {
        this.toastr.error('Error placing order', 'Error');
      }
    } catch (error) {
      this.isLoading = false;
      console.error('Error:', error);
      this.toastr.error('Error placing order', 'Error');
    }
  }
}
