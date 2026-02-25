import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuCategory } from '../../models/gift.model';

@Component({
  selector: 'app-explore-menu',
  templateUrl: './explore-menu.component.html',
  styleUrls: ['./explore-menu.component.css']
})
export class ExploreMenuComponent {
  @Input() category: string = 'All';
  @Output() categoryChange = new EventEmitter<string>();

  menuList: MenuCategory[] = [
    { menu_name: 'Flowers', menu_image: 'assets/f2.jpg' },
    { menu_name: 'Chocolates', menu_image: 'assets/ca1.jpg' },
    { menu_name: 'Cakes', menu_image: 'assets/c1.jpg' },
    { menu_name: 'Toys', menu_image: 'assets/t1.jpg' },
    { menu_name: 'Personalized', menu_image: 'assets/p2.jpg' },
    { menu_name: 'Jewelry', menu_image: 'assets/j1.jpg' },
    { menu_name: 'Gift Hampers', menu_image: 'assets/gh3.jpg' },
    { menu_name: 'Greeting Cards', menu_image: 'assets/g1.jpg' }
  ];

  setCategory(menuName: string) {
    const newCategory = this.category === menuName ? 'All' : menuName;
    this.categoryChange.emit(newCategory);
  }
}
