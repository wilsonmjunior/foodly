import { ReactNode } from 'react';
import Link from 'next/link';

import { Icon } from '@/presentation/components/Icon';

type MenuItemProps = {
    icon: ReactNode;
    title: string;
    href: string;
};

export function MenuItem({ icon, title, href }: MenuItemProps) {
    return (
        <Link href={href} prefetch={false}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                    {icon}
                    <span className="ml-3 text-gray-700">{title}</span>
                </div>
                <Icon name="CaretRight" size={20} className="text-gray-500" />
            </div>
        </Link>
    );
}
