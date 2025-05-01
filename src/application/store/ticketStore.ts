import { create } from 'zustand';

import { Product, ProductOptionItem } from '@/domain/entities/Product';
import { Ticket, TicketProduct, TicketProductOption } from '@/domain/entities/Ticket';
import { ticketsRepository } from '@/infrastructure/repositories/ticketsRepository';
import { isBrowser } from '@/utils/browser';

type TicketState = {
    ticket: Ticket | null;
    initialized: boolean;
    hydrate: () => Promise<void>;
    addProduct(
        product: Product,
        quantity: number,
        options: {
            drinks: ProductOptionItem[];
            cutlery: string[];
            additional: string[];
            observation: string;
        },
    ): void;
    removeProduct(productId: number | string): void;
    updateProductQuantity(productId: number | string, quantity: number): void;
    clearTicket(): void;
    getTicket(): Promise<Ticket | null>;
};

const mapOptionsToTicketOptions = (
    product: Product,
    options: {
        drinks: ProductOptionItem[];
        cutlery: string[];
        additional: string[];
        observation: string;
    },
): { options: TicketProductOption[]; observation?: string } => {
    const ticketOptions: TicketProductOption[] = [];

    if (options.drinks && options.drinks.length > 0) {
        const drinksWithQuantity = options.drinks.filter(
            (item) => item.quantity && item.quantity > 0,
        );

        if (drinksWithQuantity.length > 0) {
            const drinksMapped = drinksWithQuantity.map((item) => ({
                id: item.id,
                quantity: item.quantity || 0,
                label: item.label,
                price: item.price,
            }));

            ticketOptions.push({
                id: 'bebidas',
                value: drinksMapped,
            });
        }
    }

    if (options.cutlery && options.cutlery.length > 0) {
        ticketOptions.push({
            id: 'talher',
            value: options.cutlery[0],
        });
    }

    if (options.drinks && options.drinks.length > 0) {
        ticketOptions.push({
            id: 'adicionais',
            value: options.additional,
        });
    }

    return {
        options: ticketOptions,
        observation:
            options.observation && options.observation.trim() !== ''
                ? options.observation
                : undefined,
    };
};

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function calculateTotal(
    product: Product,
    quantity: number,
    options: {
        drinks: ProductOptionItem[];
        cutlery: string[];
        additional: string[];
        observation: string;
    },
): number {
    let unitTotal = product.price;

    if (options.drinks) {
        options.drinks.forEach((drink) => {
            if (drink.quantity && drink.quantity > 0 && drink.price) {
                unitTotal += drink.price * drink.quantity;
            }
        });
    }

    if (options.cutlery && options.cutlery.length > 0) {
        const cutleryGroup = product.options?.find((opt) => opt.id === 'talher');
        if (cutleryGroup) {
            const selectedCutlery = cutleryGroup.items.find(
                (item) => item.id === options.cutlery[0],
            );
            if (selectedCutlery && selectedCutlery.price) {
                unitTotal += selectedCutlery.price;
            }
        }
    }

    if (options.additional && options.additional.length > 0) {
        const additionalGroup = product.options?.find((opt) => opt.id === 'adicionais');
        if (additionalGroup) {
            options.additional.forEach((additionalId) => {
                const selectedAdditional = additionalGroup.items.find(
                    (item) => item.id === additionalId,
                );
                if (selectedAdditional && selectedAdditional.price) {
                    unitTotal += selectedAdditional.price;
                }
            });
        }
    }

    return unitTotal * quantity;
}

export const useTicketStore = create<TicketState>((set, get) => ({
    ticket: null,
    initialized: false,

    hydrate: async () => {
        if (!isBrowser || get().initialized) return;

        try {
            const ticket = await ticketsRepository.getTicket();
            if (ticket) {
                set({ ticket, initialized: true });
            } else {
                set({ initialized: true });
            }
        } catch (error) {
            console.error('Erro ao hidratar ticket store:', error);
            set({ initialized: true });
        }
    },

    addProduct: (product, quantity, options) => {
        if (!isBrowser) return;

        const currentTicket = get().ticket;

        const { options: ticketOptions, observation } = mapOptionsToTicketOptions(product, options);

        const ticketProduct: TicketProduct = {
            product,
            quantity,
            options: ticketOptions,
            observation,
        };

        if (!currentTicket) {
            const newTicket: Ticket = {
                id: generateId(),
                products: [ticketProduct],
                total: calculateTotal(product, quantity, options),
                createdAt: new Date().toISOString(),
                status: 'pending',
                establishmentId: product.establishment?.id,
                establishmentName: product.establishment?.name,
                establishmentImage: product.establishment?.image,
            };

            ticketsRepository.createTicket(newTicket);

            set({ ticket: newTicket });
            return;
        }

        const updatedTicket: Ticket = {
            ...currentTicket,
            products: [...currentTicket.products, ticketProduct],
            total: currentTicket.total + calculateTotal(product, quantity, options),
        };

        ticketsRepository.addProduct(updatedTicket);

        set({ ticket: updatedTicket });
    },

    removeProduct: (productId) => {
        if (!isBrowser) return;

        const currentTicket = get().ticket;
        if (!currentTicket) return;

        const updatedProducts = currentTicket.products.filter(
            ({ product }) => product.id !== productId,
        );

        if (updatedProducts.length === 0) {
            ticketsRepository.clearAllTickets();
            set({ ticket: null });
            return;
        }

        const total = updatedProducts.reduce((acc, item) => {
            const options: {
                drinks: ProductOptionItem[];
                cutlery: string[];
                additional: string[];
                observation: string;
            } = { drinks: [], cutlery: [], additional: [], observation: item.observation || '' };
            if (item.options) {
                item.options.forEach((opt) => {
                    if (opt.id === 'bebidas') options.drinks = opt.value as ProductOptionItem[];
                    if (opt.id === 'talher') options.cutlery = [opt.value as string];
                    if (opt.id === 'adicionais') options.additional = opt.value as string[];
                });
            }
            return acc + calculateTotal(item.product, item.quantity, options);
        }, 0);

        const updatedTicket = {
            ...currentTicket,
            products: updatedProducts,
            total: total,
        };

        ticketsRepository.addProduct(updatedTicket);

        set({ ticket: updatedTicket });
    },

    updateProductQuantity: (productId, quantity) => {
        if (!isBrowser) return;

        const currentTicket = get().ticket;
        if (!currentTicket) return;

        const updatedProducts = currentTicket.products.map((item) => {
            if (item.product.id === productId) {
                return {
                    ...item,
                    quantity: quantity,
                };
            }
            return item;
        });

        const total = updatedProducts.reduce((acc, { product, quantity }) => {
            return acc + product.price * quantity;
        }, 0);

        const updatedTicket = {
            ...currentTicket,
            products: updatedProducts,
            total: total,
        };

        ticketsRepository.addProduct(updatedTicket);
        set({ ticket: updatedTicket });
    },

    clearTicket: () => {
        if (!isBrowser) return;
        ticketsRepository.clearAllTickets();
        set({ ticket: null });
    },

    getTicket: async () => {
        if (!isBrowser) return null;

        try {
            const ticket = await ticketsRepository.getTicket();

            if (ticket) {
                set({ ticket });
                return ticket;
            }
        } catch (error) {
            console.error('Erro ao obter ticket:', error);
        }

        return null;
    },
}));
