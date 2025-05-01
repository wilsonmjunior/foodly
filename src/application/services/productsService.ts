import { productsRepository as repo } from '@/infrastructure/repositories/productsRepository';

type GetProductParams = {
    productId: number;
};

export async function getProductDetails({ productId }: GetProductParams) {
    const response = await repo.getProductDetails(productId);
    return response;
}
