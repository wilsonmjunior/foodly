import { Catalog as ItemCatalog } from '@/domain/entities/Catalog';
import { CatalogCard } from './CatalogCard';

type CatalogProps = {
    data: ItemCatalog[];
};

export function Catalog({ data }: CatalogProps) {
    return (
        <div className="flex flex-col gap-4 mx-4">
            {data.map((catalog) => (
                <CatalogCard key={catalog.id} href={`/catalog/${catalog.id}`} catalog={catalog} />
            ))}
        </div>
    );
}
