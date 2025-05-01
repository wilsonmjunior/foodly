import { Product } from './Product';

export interface TicketProductOption {
    id: string;
    value:
        | string
        | string[]
        | number
        | Array<{
              id: string;
              quantity: number;
              label: string;
              price?: number;
          }>;
}

export interface TicketProduct {
    product: Product;
    quantity: number;
    options: TicketProductOption[];
    observation?: string;
}

export interface Ticket {
    id: string;
    products: TicketProduct[];
    total: number;
    createdAt: string;
    status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
    customerName?: string;
    customerId?: string;
    establishmentId?: number;
    establishmentName?: string;
    establishmentImage?: string;
}
