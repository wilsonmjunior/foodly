import { Product } from './Product';

export interface Category {
    id: number;
    name: string;
    icon: string;
    image: string;
    items: Product[];
}

export interface Catalog {
    id: number;
    name: string;
    image: string;
    deliveryFee: number;
    deliveryFeeLabel: string;
    rating: number;

    address?: string;
    deliveryTime?: string;
    distance?: string;
    freeDeliveryMinimum?: number;
    minimumOrder?: number;
    openUntil?: string;
    categories?: Category[];
}
