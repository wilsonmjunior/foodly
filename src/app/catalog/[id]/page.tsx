import Image from 'next/image';

import { getItemCatalog } from '@/application/services/catalogService';
import DeliveryFree from '@/presentation/assets/icons/delivery.svg';
import DeliveryPaid from '@/presentation/assets/icons/delivery-paid.svg';
import {
    Footer,
    Icon,
    CategoryAccordion,
    ToastError,
    NotFoundError,
} from '@/presentation/components';
import { formatCurrency } from '@/utils/format/currency';

type ParamsType = Promise<{ id: string }>;

type PageProps = {
    params: ParamsType;
};

export default async function CatalogPage({ params }: PageProps) {
    const catalogId = parseInt((await params).id, 10);

    let itemCatalog = null;
    let error = '';

    try {
        itemCatalog = await getItemCatalog(catalogId);
    } catch (err: unknown) {
        const appError = err as { message: string };
        error = appError.message;
    }

    return (
        <div className="flex flex-col min-h-[100dvh] md:min-h-screen">
            {itemCatalog ? (
                <div className="flex-1 bg-white">
                    <div className="p-4">
                        <div className="flex flex-row items-center">
                            <div className="relative w-[72px] h-[72px]">
                                <Image
                                    src={itemCatalog.image}
                                    alt={itemCatalog.name}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <h1 className="text-xl font-bold ml-2">{itemCatalog.name}</h1>
                        </div>

                        <div className="mt-3 flex flex-row justify-between">
                            <div className="flex flex-row gap-4">
                                <Icon
                                    name="ShareNetwork"
                                    size={20}
                                    className="text-primary-700"
                                    weight="bold"
                                />
                                <Icon
                                    name="Heart"
                                    size={20}
                                    className="text-primary-700"
                                    weight="bold"
                                />
                            </div>

                            <div className="flex flex-row items-center">
                                <p className="text-teal-400 font-bold">mais infos</p>
                                <Icon name="CaretRight" size={12} className="text-teal-400" />
                            </div>
                        </div>

                        <div className="mt-3 flex flex-row items-center">
                            {itemCatalog.deliveryFee === 0 ? (
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={DeliveryFree} alt="Entrega Gratis" />
                                    <p className="text-sm font-bold text-teal-600">grátis</p>
                                </div>
                            ) : (
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={DeliveryPaid} alt="Entrega Paga" />
                                    <span className="font-bold text-sm text-primary-500">
                                        {formatCurrency(itemCatalog.deliveryFee)}
                                    </span>
                                </div>
                            )}

                            <Icon name="Dot" size={24} className="text-neutral-400" weight="bold" />
                            <p className="text-xs font-bold text-neutral-500">
                                hoje, {itemCatalog.deliveryTime || '30-40 min'}
                            </p>
                            <Icon name="Dot" size={24} className="text-neutral-400" weight="bold" />
                            <p className="text-xs font-bold text-neutral-500">
                                {itemCatalog.distance || '5.2km'}
                            </p>
                        </div>

                        <div className="mt-3 px-2 py-1.5 bg-teal-50 rounded">
                            <p className="text-xs font-bold text-teal-600">
                                entrega grátis acima de{' '}
                                {formatCurrency(itemCatalog.freeDeliveryMinimum || 35.0)}
                            </p>
                        </div>

                        <div className="mt-3 flex flex-row items-center gap-2">
                            <Icon name="Star" size={16} weight="fill" className="text-yellow-500" />
                            <p className="text-xs text-neutral-500 font-bold">
                                {itemCatalog.rating} de 5
                            </p>
                            <p className="text-neutral-400">•</p>
                            <p className="text-xs font-bold text-green-500">
                                fecha às {itemCatalog.openUntil || '20:00'}
                            </p>
                        </div>

                        <div className="mt-3">
                            <p className="text-xs font-bold text-neutral-500">
                                pedido mínimo: {formatCurrency(itemCatalog.minimumOrder || 15.0)}
                            </p>
                        </div>
                    </div>

                    {itemCatalog.categories && itemCatalog.categories.length > 0 && (
                        <CategoryAccordion
                            categories={itemCatalog.categories}
                            catalogId={catalogId}
                        />
                    )}
                </div>
            ) : (
                <NotFoundError message="estabelecimento não encontrado" />
            )}

            <div className="mt-4">
                <Footer />
            </div>

            <ToastError message={error} />
        </div>
    );
}
