import { Document } from 'mongoose';
import { Product } from './product';

interface ProductOrder {
  product: Product;
  quantity: number;
}

export interface Oder extends Document {
  owner: string;
  totalPrice: string;
  products: ProductOrder[];
  created: Date;
}
