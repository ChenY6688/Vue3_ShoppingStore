export interface NewsInter {
  id: string,
  title: string,
  content: string
}

export interface ProductInter {
  id: number | string;
  title: string;
  image: string;
  num: number;
  price: number;
}

export interface SaveDataParams {
  item: ProductInter;
  imageFile: File[];
  type: 'addItem' | 'editItem';
}