'use client';

import { ReactNode, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="bg-white">
            <button
                className="flex justify-between items-center w-full p-4 font-bold text-left"
                onClick={() => setOpen((v) => !v)}
                type="button"
            >
                <span>{title}</span>
                <CaretDown
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            {open && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
}
