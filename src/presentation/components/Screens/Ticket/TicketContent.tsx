'use client';

import Image from 'next/image';

import { useTicketStore } from '@/application/store/ticketStore';
import { Button } from '@/presentation/components';
import { formatCurrency } from '@/utils/format/currency';
import { EmptyTicket, TicketProductList } from './components';

export function TicketContent() {
    const ticket = useTicketStore((state) => state.ticket);

    if (!ticket || !ticket.products || ticket.products.length === 0) {
        return <EmptyTicket />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 bg-white flex flex-col">
                {ticket.establishmentName && (
                    <div className="flex flex-row items-center bg-white p-4">
                        <div className="w-8 h-8 overflow-hidden rounded">
                            <Image
                                src={ticket.establishmentImage ?? ''}
                                width={32}
                                height={32}
                                alt="Logo do estabelecimento"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="ml-2">
                            <p className="text-sm text-neutral-500 font-bold">seus items em</p>
                            <h2 className="font-bold text-neutral-900">
                                {ticket.establishmentName}
                            </h2>
                        </div>
                    </div>
                )}

                <div className="flex-1 bg-neutral-100">
                    <TicketProductList />
                </div>
            </div>

            <div className="sticky bottom-0 flex flex-row justify-between py-4 px-8 bg-white shadow-2xl shadow-neutral-600 rounded-t-2xl">
                <div className="flex-1">
                    <p className="font-bold text-sm text-neutral-900">subtotal</p>
                    <p className="font-extrabold text-xl text-primary-500">
                        {formatCurrency(ticket.total)}
                    </p>
                </div>

                <Button
                    title="ir para pagamento"
                    size="lg"
                    className="flex-1"
                    onClick={() => console.log('Finalizar pedido')}
                />
            </div>
        </div>
    );
}
