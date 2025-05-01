'use client';

import { Button } from '@/presentation/components';
import { useProductQuantity } from '@/presentation/hooks';
import { formatCurrency } from '@/utils/format/currency';
import { SumQuantity } from '../../../SumQuantity';

type ProductQuantityProps = {
    productId: number | string;
    productPrice: number;
    onAddProduct: (quantity: number) => void;
    totalPrice?: number;
    isAddedToCart?: boolean;
};

export function ProductQuantity({
    productId,
    productPrice,
    onAddProduct,
    totalPrice,
    isAddedToCart,
}: ProductQuantityProps) {
    const { quantity, isInCart, handleIncrement, handleDecrement } = useProductQuantity({
        productId,
        onExternalUpdate: onAddProduct,
    });

    const hasAddedToCart = isAddedToCart || isInCart;

    const handleAddProduct = () => {
        onAddProduct(quantity);
    };

    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-b border-gray-100">
            <div className="flex flex-col flex-1">
                <p className="font-bold text-neutral-700">quantos?</p>
                <span className="text-sm text-neutral-500">
                    total {formatCurrency(totalPrice || productPrice * quantity)}
                </span>
            </div>

            {!hasAddedToCart ? (
                <div className="flex">
                    <Button title="adicionar" size="sm" onClick={handleAddProduct} />
                </div>
            ) : (
                <SumQuantity
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                    quantity={quantity}
                />
            )}
        </div>
    );
}
