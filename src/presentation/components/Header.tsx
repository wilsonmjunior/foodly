import React from 'react';
import Image from 'next/image';

import Logo from '../assets/aiq-branding.png';

import { Icon } from './Icon';
import Link from 'next/link';

type HeaderProps = {
    children?: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
    return (
        <header className="p-4 bg-primary-700">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <Image src={Logo} alt="Logo" className="w-10 h-10 object-contain rounded" />
                </Link>

                <div>
                    <p className="text-sm text-primary-200">entregando em</p>
                    <div className="flex flex-row items-center">
                        <p className="text-white">Rua Mandaguari, 198</p>
                        <Icon name="CaretRight" className="text-white" size={20} weight="bold" />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Link href="/favorites">
                        <Icon name="Heart" size={24} className="text-white" />
                    </Link>
                    <Link href="/profile">
                        <Icon name="User" size={24} className="text-white" />
                    </Link>
                </div>
            </div>

            {children}
        </header>
    );
}
