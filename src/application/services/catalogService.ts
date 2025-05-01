import { catalogRepository as repo } from '@/infrastructure/repositories/catalogRepository';

export async function getCatalog() {
    const respone = await repo.getAll();
    return respone;
}

export async function getItemCatalog(itemCatalogId: number) {
    const respone = await repo.getItemCatalog(itemCatalogId);
    return respone;
}
