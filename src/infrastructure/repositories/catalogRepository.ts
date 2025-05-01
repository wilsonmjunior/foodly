import { Catalog } from '@/domain/entities/Catalog';
import { ApiError } from '../api/ApiError';
import { api } from '../api';

export const catalogRepository = {
    async getAll() {
        try {
            const response = await api.get<Catalog[]>('catalog');
            const catalog = response.data;
            return catalog || [];
        } catch (error) {
            console.log('delta:error:: ', error);
            throw ApiError(error, 'Erro ao carregar catalogo. Tente novamente mais tarde.');
        }
    },
    async getItemCatalog(catalogId: number) {
        try {
            const responseCatalogDetails = await api.get<Catalog>(`catalog-details/${catalogId}`);
            const detailedCatalog = responseCatalogDetails.data;
            if (detailedCatalog) {
                return detailedCatalog;
            }

            const responseCatalog = await api.get<Catalog>(`catalog/${catalogId}`);
            const catalog = responseCatalog.data;
            return catalog;
        } catch (error) {
            throw ApiError(error, 'Erro ao carregar item do catalogo. Tente novamente mais tarde.');
        }
    },
};
