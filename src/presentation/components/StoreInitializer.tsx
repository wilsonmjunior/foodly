'use client';

import { useEffect } from 'react';
import { useTicketStore } from '@/application/store/ticketStore';

export function StoreInitializer() {
    const hydrateTicketStore = useTicketStore((state) => state.hydrate);

    useEffect(() => {
        hydrateTicketStore();
    }, [hydrateTicketStore]);

    return null;
}
