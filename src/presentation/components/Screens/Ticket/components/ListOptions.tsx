import { Fragment } from 'react';

import { TicketProductOption } from '@/domain/entities/Ticket';
import { formatCurrency } from '@/utils/format/currency';

interface OptionItem {
    id: string | number;
    quantity?: number;
    label?: string;
    price?: number;
    [key: string]: string | number | boolean | undefined;
}

type ListOptionsProps = {
    options?: TicketProductOption[];
};

export function ListOptions({ options }: ListOptionsProps) {
    return (
        options &&
        options.length > 0 && (
            <div className="mt-2 text-sm text-neutral-500">
                {options.map((option) => (
                    <Fragment key={option.id}>
                        <p className="font-bold text-xs">{`• ${option.id}`}</p>

                        {typeof option.value === 'string' ? (
                            <p className="text-xs font-semibold text-neutral-500 ml-2">
                                {option.value}
                            </p>
                        ) : Array.isArray(option.value) ? (
                            option.value.map((item: string | OptionItem) =>
                                typeof item === 'object' && item !== null ? (
                                    <div key={item.id} className="ml-2">
                                        {item.quantity && item.quantity > 1 && (
                                            <span className="font-semibold text-xs text-neutral-700">
                                                {`${item.quantity}x `}
                                            </span>
                                        )}

                                        <span className="text-xs font-semibold text-neutral-500">
                                            {item.label}
                                        </span>

                                        {item.price && (
                                            <span className="ml-3 font-bold text-xs text-teal-400">
                                                {` +${formatCurrency(item.price)}`}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <span
                                        key={item}
                                        className="text-xs font-semibold text-neutral-500 ml-2"
                                    >
                                        {item} <br />
                                    </span>
                                ),
                            )
                        ) : (
                            <span>{String(option.value)}</span>
                        )}
                    </Fragment>
                ))}
            </div>
        )
    );
}
