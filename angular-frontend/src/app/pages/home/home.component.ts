import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  category = 'All';

  setCategory(newCategory: string) {
    this.category = newCategory;
  }
}
