import Image from 'next/image';

import StoreNotFound from '@/presentation/assets/store-not-found.png';

type NotFoundErrorProps = {
    message: string;
};

export function NotFoundError({ message }: NotFoundErrorProps) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="relative w-[256px]">
                <Image src={StoreNotFound} alt="Estabelecimento" className="object-contain" />
            </div>
            <h3 className="text-primary-700 -mt-5">{message}</h3>
        </div>
    );
}
