import { useCallback, useEffect, useMemo, useState } from 'react';

import { useTicketStore } from '@/application/store/ticketStore';
import { Product, QuantityOptionGroup, RadioCheckboxOptionGroup } from '@/domain/entities/Product';
import { ProductOptionsQuantityItem } from '../components/Screens/Product/components';

type UseProductDetailsProps = {
    product: Product;
};

export function useProductDetails({ product }: UseProductDetailsProps) {
    const [mounted, setMounted] = useState(false);
    const [addedToTicket, setAddedToTicket] = useState(false);

    const addProductToTicket = useTicketStore((state) => state.addProduct);
    const productsInTicket = useTicketStore((state) => state.ticket?.products);

    const optionGroups = product.options || [];

    const drinksGroup = optionGroups.find(
        (group) => group.id === 'bebidas' && group.type === 'quantity',
    ) as QuantityOptionGroup | undefined;
    const cutleryGroup = optionGroups.find(
        (group) => group.id === 'talher' && group.type === 'radio',
    ) as RadioCheckboxOptionGroup | undefined;
    const additionalGroup = optionGroups.find(
        (group) => group.id === 'adicionais' && group.type === 'checkbox',
    ) as RadioCheckboxOptionGroup | undefined;

    const [drinks, setDrinks] = useState<ProductOptionsQuantityItem[]>(
        drinksGroup?.items.map((item) => ({
            ...item,
            quantity: item.quantity || 0,
        })) || [],
    );
    const [cutlery, setCutlery] = useState<string[]>([]);
    const [additional, setAdditional] = useState<string[]>([]);
    const [note, setNote] = useState('');

    useEffect(() => {
        setMounted(true);
        if (productsInTicket) {
            const ticketProduct = productsInTicket.find((item) => item.product.id === product.id);
            if (ticketProduct) {
                if (ticketProduct.quantity) setAddedToTicket(true);
                const drinksOpt = ticketProduct.options?.find((opt) => opt.id === 'bebidas');
                if (drinksOpt && drinksGroup) {
                    setDrinks(
                        drinksGroup.items.map((item) => {
                            const found = (
                                drinksOpt.value as { id: string; quantity: number }[]
                            ).find((b) => b.id === item.id);
                            return { ...item, quantity: found?.quantity || 0 };
                        }),
                    );
                }
                const cutleryOpt = ticketProduct.options?.find((opt) => opt.id === 'talher');
                if (cutleryOpt) setCutlery([cutleryOpt.value as string]);
                const additionalOpt = ticketProduct.options?.find((opt) => opt.id === 'adicionais');
                if (additionalOpt) setAdditional(additionalOpt.value as string[]);
                if (ticketProduct.observation) setNote(ticketProduct.observation);
            }
        }
    }, [productsInTicket, drinksGroup, product.id]);

    const calculateTotalPrice = useMemo(() => {
        let total = product.price;

        drinks.forEach((drink) => {
            if (drink.quantity && drink.quantity > 0 && drink.price) {
                total += drink.price * drink.quantity;
            }
        });

        if (cutlery.length > 0 && cutleryGroup) {
            const selectedCutlery = cutleryGroup.items.find((item) => item.id === cutlery[0]);
            if (selectedCutlery && selectedCutlery.price) {
                total += selectedCutlery.price;
            }
        }

        if (additionalGroup) {
            additional.forEach((additionalId) => {
                const additional = additionalGroup.items.find((item) => item.id === additionalId);
                if (additional && additional.price) {
                    total += additional.price;
                }
            });
        }

        return total;
    }, [product.price, drinks, cutlery, additional, cutleryGroup, additionalGroup]);

    const handleAddToTicket = useCallback(
        (quantity: number) => {
            if (!mounted) return;

            addProductToTicket(product, quantity, {
                drinks,
                cutlery,
                additional,
                observation: note,
            });

            setAddedToTicket(true);
        },
        [mounted, product, drinks, cutlery, additional, note, addProductToTicket],
    );

    return {
        addedToTicket,
        additional,
        additionalGroup,
        drinks,
        drinksGroup,
        calculateTotalPrice,
        handleAddToTicket,
        note,
        setDrinks,
        cutleryGroup,
        setAdditional,
        cutlery,
        setCutlery,
        setNote,
    };
}
