export interface ProductOptionItem {
    id: string;
    label: string;
    price?: number;
    quantity?: number;
}

export interface BaseProductOptionGroup {
    id: string;
    title: string;
    min: number;
    max: number;
    required?: boolean;
    items: ProductOptionItem[];
}

export interface QuantityOptionGroup extends BaseProductOptionGroup {
    type: 'quantity';
}

export interface RadioCheckboxOptionGroup extends BaseProductOptionGroup {
    type: 'radio' | 'checkbox';
}

export type ProductOptionGroup = QuantityOptionGroup | RadioCheckboxOptionGroup;

export interface Establishment {
    id: number;
    name: string;
    image: string;
    deliveryFee: number;
    deliveryFeeLabel: string;
    rating: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;

    categoryId?: number;
    category?: string;
    image?: string;
    rating?: number;
    ingredients?: string[];
    originalPrice?: number;
    hasPromo?: boolean;
    isVegan?: boolean;

    establishment?: Establishment;
    options?: ProductOptionGroup[];
}
