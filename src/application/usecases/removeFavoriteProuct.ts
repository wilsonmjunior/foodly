import { favoriteProductsRepository as repo } from '@/infrastructure/repositories';

export async function removeFavoriteProduct(productId: number) {
    const oldList = await repo.fetch();

    if (!oldList) {
        return [];
    }

    const newList = oldList.filter((product) => product.id !== productId);

    await repo.save(newList);

    return newList;
}
