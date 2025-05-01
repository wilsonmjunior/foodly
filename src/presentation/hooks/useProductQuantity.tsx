import { useTicketStore } from '@/application/store/ticketStore';

type UseProductQuantityProps = {
    productId: string | number;
    initialQuantity?: number;
    onExternalUpdate?: (quantity: number) => void;
};

export function useProductQuantity({
    productId,
    initialQuantity = 1,
    onExternalUpdate,
}: UseProductQuantityProps) {
    const products = useTicketStore((state) => state.ticket?.products);
    const updateProductQuantity = useTicketStore((state) => state.updateProductQuantity);
    const removeProduct = useTicketStore((state) => state.removeProduct);

    const findProductInCart = () => {
        if (!products) return null;
        return products.find((item) => item.product.id === productId);
    };

    const productInCart = findProductInCart();
    const quantity = productInCart?.quantity || initialQuantity;
    const isInCart = !!productInCart;

    const handleIncrement = () => {
        if (productInCart) {
            updateProductQuantity(productId, quantity + 1);
        } else if (onExternalUpdate) {
            onExternalUpdate(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (!productInCart) {
            if (quantity <= 1) {
                return;
            }

            if (onExternalUpdate) {
                onExternalUpdate(quantity - 1);
            }
            return;
        }

        if (quantity > 1) {
            updateProductQuantity(productId, quantity - 1);
        } else if (quantity === 1) {
            removeProduct(productId);
        }
    };

    return {
        quantity,
        isInCart,
        handleIncrement,
        handleDecrement,
    };
}
