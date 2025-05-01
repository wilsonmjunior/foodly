'use client';

import { useRouter } from 'next/navigation';

import { Button, Footer } from '@/presentation/components';

export function EmptyTicket() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-[100dvh] md:min-h-screen bg-gray-100">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-bold text-neutral-700 mb-4">Seu ticket está vazio</h2>
                <p className="text-neutral-500 mb-6 text-center">
                    Adicione itens ao seu ticket para continuar com seu pedido
                </p>

                <Button title="Ver cardápio" size="lg" onClick={() => router.push('/')} />
            </div>

            <Footer />
        </div>
    );
}
