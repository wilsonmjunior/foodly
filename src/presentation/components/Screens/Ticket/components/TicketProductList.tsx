'use client';

import { useTicketStore } from '@/application/store/ticketStore';
import { ProductItem } from './ProductItem';

export function TicketProductList() {
    const products = useTicketStore((state) => state.ticket?.products);

    return (
        <div className="w-full">
            {products?.map(({ product, quantity, observation, options }) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    observation={observation}
                    options={options}
                />
            ))}
        </div>
    );
}
