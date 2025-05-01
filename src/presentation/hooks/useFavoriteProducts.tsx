import { useCallback } from 'react';

import { useFavoriteProductsStore } from '@/application/store/favoriteProductsStore';
import { Product } from '@/domain/entities/Product';

export function useFavoriteProducts() {
    const { products, addProduct } = useFavoriteProductsStore((store) => store);

    const handleAddFavoriteProduct = useCallback(
        (product: Product) => {
            addProduct(product);
        },
        [addProduct],
    );

    return {
        products,
        handleAddFavoriteProduct,
    };
}
