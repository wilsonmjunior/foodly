import { useMemo } from 'react';
import Link from 'next/link';

import { TicketProductOption } from '@/domain/entities/Ticket';
import { Product } from '@/domain/entities/Product';
import { Icon } from '@/presentation/components/Icon';
import { SumQuantity } from '@/presentation/components/SumQuantity';
import { useProductQuantity } from '@/presentation/hooks';
import { formatCurrency } from '@/utils/format/currency';
import { ListOptions } from './ListOptions';

type ProductItemProps = {
    product: Product;
    quantity: number;
    observation?: string;
    options?: TicketProductOption[];
};

export function ProductItem({ product, quantity, observation, options }: ProductItemProps) {
    const { handleIncrement, handleDecrement } = useProductQuantity({
        productId: product.id,
    });

    const total = useMemo(() => product.price * quantity, [product.price, quantity]);

    return (
        <div className="flex flex-col bg-white p-4 mb-1">
            <div className="flex flex-row justify-between items-center">
                <p className="text-sm font-bold text-neutral-900">{product.title}</p>
                <p className="text-sm font-bold text-primary-500">{formatCurrency(total)}</p>
            </div>

            <div className="flex justify-between mt-2">
                <div className="flex-grow"></div>
                <div className="flex items-center justify-end">
                    <div className="flex flex-row items-center">
                        <Icon name="FoodPencil" size={16} className="text-teal-400" />
                        <Link href={`/catalog/2/product/${product.id}`} prefetch={false}>
                            <span className="text-sm font-bold text-teal-400">editar</span>
                        </Link>
                    </div>

                    <div className="ml-6">
                        <SumQuantity
                            onDecrement={handleDecrement}
                            onIncrement={handleIncrement}
                            quantity={quantity}
                        />
                    </div>
                </div>
            </div>

            <ListOptions options={options} />

            {observation && (
                <div className="mt-2 text-sm bg-neutral-50 rounded p-2 text-neutral-700">
                    <p className="text-xs text-neutral-700">
                        <span className="font-bold">observação: </span>
                        <span className="font-semibold">{observation}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
