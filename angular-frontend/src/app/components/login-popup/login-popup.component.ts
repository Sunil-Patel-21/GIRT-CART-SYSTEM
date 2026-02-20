import { Component, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {
  @Output() closeEvent = new EventEmitter<void>();
  currState = 'Sign Up';
  data = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private storeService: StoreService) {}

  close() {
    this.closeEvent.emit();
  }

  onLogin(event: Event) {
    event.preventDefault();
    
    console.log('Form submitted:', this.currState, this.data);
    
    if (this.currState === 'Login') {
      console.log('Attempting login...');
      this.storeService.login(this.data).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          if (response.success) {
            this.storeService.setToken(response.token);
            alert('Login successful!');
            this.close();
          } else {
            alert(response.message || 'Login failed');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          alert('Server error. Please check if backend is running on port 4000');
        }
      });
    } else {
      console.log('Attempting registration...');
      this.storeService.register(this.data).subscribe({
        next: (response) => {
          console.log('Register response:', response);
          if (response.success) {
            this.storeService.setToken(response.token);
            alert('Registration successful!');
            this.close();
          } else {
            alert(response.message || 'Registration failed');
          }
        },
        error: (error) => {
          console.error('Registration error:', error);
          alert('Server error. Please check if backend is running on port 4000');
        }
      });
    }
  }

  toggleState() {
    this.currState = this.currState === 'Login' ? 'Sign Up' : 'Login';
  }
}
