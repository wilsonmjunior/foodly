import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Catalog } from '@/domain/entities/Catalog';
import DeliveryFree from '@/presentation/assets/icons/delivery.svg';
import DeliveryPaid from '@/presentation/assets/icons/delivery-paid.svg';
import { Icon } from '@/presentation/components/Icon';
import { formatCurrency } from '@/utils/format/currency';

type CatalogCardProps = {
    href: string;
    catalog: Catalog;
};

export function CatalogCard({ href, catalog }: CatalogCardProps) {
    return (
        <Link href={href} prefetch={false}>
            <div className="h-[72px] flex items-center bg-neutral-200 rounded-lg">
                <div className="relative w-[72px] h-full">
                    <Image
                        src={catalog.image}
                        alt={catalog.name}
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                <div className="flex-1 p-3">
                    <div className="font-bold mb-1">{catalog.name}</div>

                    <div className="flex items-center space-x-2">
                        {catalog.deliveryFee === 0 ? (
                            <>
                                <Image src={DeliveryFree} alt="Entrega Gratis" />
                                <p className="text-sm font-bold text-teal-600">grátis</p>
                            </>
                        ) : (
                            <>
                                <Image src={DeliveryPaid} alt="Entrega Paga" />
                                <span className="font-bold text-sm text-primary-500">
                                    {formatCurrency(catalog.deliveryFee)}
                                </span>
                            </>
                        )}

                        <div className="flex items-center gap-1.5">
                            <Icon name="Star" weight="fill" size={18} className="text-yellow-500" />
                            <p className="font-bold text-sm text-neutral-500">{catalog.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
