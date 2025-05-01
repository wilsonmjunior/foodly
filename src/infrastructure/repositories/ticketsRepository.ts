import { Ticket } from '@/domain/entities/Ticket';
import { getValue, setValue } from '../storage';
import { STORAGE_KEYS } from '../storage/constants';

export const ticketsRepository = {
    async getTicket(): Promise<Ticket | null> {
        try {
            const ticket = await getValue<Ticket>(STORAGE_KEYS.TICKET);
            return ticket;
        } catch (error) {
            console.error('Erro ao recuperar ticket dos cookies:', error);
            return null;
        }
    },

    addProduct(ticket: Ticket): boolean {
        try {
            setValue(STORAGE_KEYS.TICKET, ticket);
            return true;
        } catch (error) {
            console.error('Erro ao adicionar produto ao ticket:', error);
            return false;
        }
    },

    createTicket(ticket: Ticket): boolean {
        try {
            setValue(STORAGE_KEYS.TICKET, ticket);
            return true;
        } catch (error) {
            console.error('Erro ao criar ticket:', error);
            return false;
        }
    },

    clearAllTickets(): boolean {
        try {
            setValue(STORAGE_KEYS.TICKET, null);
            return true;
        } catch (error) {
            console.error('Erro ao limpar tickets:', error);
            return false;
        }
    },
};
