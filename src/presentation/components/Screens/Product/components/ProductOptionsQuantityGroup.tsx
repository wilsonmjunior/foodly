import {
    QuantityOptionGroup,
    ProductOptionItem as DomainProductOptionItem,
} from '@/domain/entities/Product';
import { Icon } from '@/presentation/components/Icon';

export type ProductOptionsQuantityItem = DomainProductOptionItem & {
    quantity: number;
};

type ProductOptionsQuantityGroupProps = {
    group: QuantityOptionGroup & { items: ProductOptionsQuantityItem[] };
    onChange: (id: string, quantity: number) => void;
};

export function ProductOptionsQuantityGroup({ group, onChange }: ProductOptionsQuantityGroupProps) {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-4">
                <div>
                    <p className="font-bold text-neutral-700">{group.title}</p>
                    <span className="text-xs text-neutral-500">escolha quantos quiser</span>
                </div>
            </div>
            <div className="px-4 py-2 flex flex-col gap-2">
                {group.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 py-1">
                        <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg text-gray-400"
                            onClick={() => onChange(item.id, Math.max(0, (item.quantity || 1) - 1))}
                            type="button"
                        >
                            <Icon name="Minus" size={16} />
                        </button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg text-purple-600"
                            onClick={() => onChange(item.id, (item.quantity || 0) + 1)}
                            type="button"
                        >
                            <Icon name="Plus" size={16} />
                        </button>
                        <span className="ml-2 flex-1 text-neutral-700">{item.label}</span>
                        {item.price && (
                            <span className="text-sm font-bold text-purple-600">
                                +R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
