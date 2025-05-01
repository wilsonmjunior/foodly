import { Product } from './Product';

export interface Category {
    id: number;
    name: string;
    icon: string;
    image: string;
    items: Product[];
}
