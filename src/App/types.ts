export interface Category {
  id: string;
  name: string;
  color: string;
  items?: Array<Item>;
}

export interface Item {
  id: string;
  name: string;
  x: string;
  y: string;
  width: string;
  height: string;
  display: boolean;
}
