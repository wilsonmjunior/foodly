import { formatCurrency } from '@/utils/format/currency';

export function ProductInfo({
    title,
    price,
    description,
}: {
    title: string;
    price: number;
    description: string;
}) {
    return (
        <div className="bg-white px-4 py-3">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-neutral-500">a partir de</span>
                <span className="text-lg text-purple-600 font-bold">{formatCurrency(price)}</span>
            </div>
            <p className="text-neutral-500 text-sm mt-1">{description}</p>
        </div>
    );
}
