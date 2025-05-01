import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

import { addFavoriteProduct } from '../usecases/addFavoriteProuct';
import { removeFavoriteProduct } from '../usecases/removeFavoriteProuct';
import { Product } from '@/domain/entities/Product';
import { StorageKeyType } from '@/infrastructure/storage/constants';
import { getValue, removeValue, setValue } from '@/infrastructure/storage';

type FavoriteProductsState = {
    products: Product[];
    addProduct(product: Product): void;
    removeProduct(product: Product): void;
    clearAll(): void;
};

const storage: StateStorage = {
    getItem: (key) => {
        const value = getValue<Product[]>(key as StorageKeyType);
        return value ? JSON.stringify(value) : null;
    },
    setItem: (key: string, value: string) => {
        setValue(key as StorageKeyType, JSON.parse(value));
    },
    removeItem: (key: string) => {
        removeValue(key as StorageKeyType);
    },
};

export const useFavoriteProductsStore = create<FavoriteProductsState>()(
    persist(
        (set) => ({
            products: [],
            addProduct: async (product) => {
                const list = await addFavoriteProduct(product);
                if (list) {
                    set({ products: list });
                }
            },
            removeProduct: async (product) => {
                const list = await removeFavoriteProduct(product.id);
                set({ products: list });
            },
            clearAll: () => set({ products: [] }),
        }),
        {
            name: 'favorite-products',
            storage: createJSONStorage(() => storage),
        },
    ),
);
