import Link from 'next/link';

import { Icon } from './Icon';

export function BackButton() {
    return (
        <div className="w-full flex flex-row bg-gray-200 px-4 py-2">
            <Link href="/">
                <Icon name="CaretLeft" className="text-primary-500" weight="bold" />
            </Link>
        </div>
    );
}
