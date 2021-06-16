export interface Category {
  name: string;
  color: string;
  items?: Array<Item>;
}

export interface Item {
  id: string;
}
