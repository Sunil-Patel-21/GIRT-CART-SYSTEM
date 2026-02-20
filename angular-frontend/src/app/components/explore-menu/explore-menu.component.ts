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
    { menu_name: 'Flowers', menu_image: 'assets/menu_1.png' },
    { menu_name: 'Cakes', menu_image: 'assets/menu_2.png' },
    { menu_name: 'Chocolates', menu_image: 'assets/menu_3.png' },
    { menu_name: 'Soft Toys', menu_image: 'assets/menu_4.png' },
    { menu_name: 'Personalized Gifts', menu_image: 'assets/menu_5.png' },
    { menu_name: 'Gift Hampers', menu_image: 'assets/menu_6.png' },
    { menu_name: 'Greeting Cards', menu_image: 'assets/menu_7.png' },
    { menu_name: 'Luxury Gifts', menu_image: 'assets/menu_8.png' }
  ];

  setCategory(menuName: string) {
    const newCategory = this.category === menuName ? 'All' : menuName;
    this.categoryChange.emit(newCategory);
  }
}
