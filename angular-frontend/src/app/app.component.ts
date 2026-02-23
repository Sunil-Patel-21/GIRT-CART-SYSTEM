import { Component } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <app-navbar (showLoginEvent)="onShowLogin($event)"></app-navbar>
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
    <app-login-popup *ngIf="showLogin" (closeEvent)="onCloseLogin()"></app-login-popup>
  `,
  styles: []
})
export class AppComponent {
  showLogin = false;

  constructor(private storeService: StoreService) {
    this.storeService.showLogin$.subscribe(show => {
      if (show) {
        this.showLogin = true;
      }
    });
  }

  onShowLogin(show: boolean) {
    console.log('Show login popup:', show);
    this.showLogin = show;
  }

  onCloseLogin() {
    console.log('Close login popup');
    this.showLogin = false;
  }
}
