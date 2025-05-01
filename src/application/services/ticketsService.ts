import { ticketsRepository as repo } from '@/infrastructure/repositories/ticketsRepository';

export async function getTicket() {
    const response = await repo.getTicket();
    return response;
}
