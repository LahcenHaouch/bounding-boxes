export interface Category {
  id: string;
  name: string;
  color: string;
  items?: Array<Item>;
}

export interface Item {
  id: string;
}
