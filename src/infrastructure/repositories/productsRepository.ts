import { Product } from '@/domain/entities/Product';
import { ApiError } from '../api/ApiError';
import { api } from '../api';

export const productsRepository = {
    async getProductDetails(productId: number) {
        try {
            const responseProducts = await api.get<Product>(`products/${productId}`);
            return responseProducts.data;
        } catch (error) {
            console.log('error: ', error);
            throw ApiError(
                null,
                'Erro ao carregar detalhes do produto. Tente novamente mais tarde.',
            );
        }
    },
};
