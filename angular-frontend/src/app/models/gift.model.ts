export interface Gift {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface CartItems {
  [key: string]: number;
}

export interface MenuCategory {
  menu_name: string;
  menu_image: string;
}
