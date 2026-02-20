import { Component } from '@angular/core';

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

  onShowLogin(show: boolean) {
    console.log('Show login popup:', show);
    this.showLogin = show;
  }

  onCloseLogin() {
    console.log('Close login popup');
    this.showLogin = false;
  }
}
