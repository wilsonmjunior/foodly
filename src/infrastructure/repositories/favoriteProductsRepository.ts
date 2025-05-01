import { Product } from '@/domain/entities/Product';
import { ApiError } from '../api/ApiError';
import { getValue, setValue } from '../storage';
import { STORAGE_KEYS } from '../storage/constants';

export const favoriteProductsRepository = {
    fetch() {
        try {
            return getValue<Product[]>(STORAGE_KEYS.FAVORITE_PRODUCTS) ?? [];
        } catch (error) {
            throw ApiError(
                error,
                'Erro ao carregar produtos favoritos. tente novamente mais tarde.',
            );
        }
    },
    save(list: Product[]) {
        try {
            setValue(STORAGE_KEYS.FAVORITE_PRODUCTS, list);
        } catch (error) {
            throw ApiError(
                error,
                'Erro ao adicionar produto a lista de favoritos. tente novamente mais tarde.',
            );
        }
    },
};
