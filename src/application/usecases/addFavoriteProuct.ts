import { Product } from '@/domain/entities/Product';
import { favoriteProductsRepository as repo } from '@/infrastructure/repositories/favoriteProductsRepository';

export async function addFavoriteProduct(product: Product) {
    const list = await repo.fetch();

    if (!list) return null;

    const hasFavoriteProduct = list.find((p) => p.id === product.id);
    if (!hasFavoriteProduct) {
        list.push(product);
    }

    repo.save(list);

    return list;
}
