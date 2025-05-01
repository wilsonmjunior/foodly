import { RadioCheckboxOptionGroup } from '@/domain/entities/Product';

export type OptionItem = {
    id: string;
    label: string;
    price?: number;
};

export type OptionGroup = {
    id: string;
    title: string;
    required?: boolean;
    min: number;
    max: number;
    type: 'radio' | 'checkbox';
    items: OptionItem[];
};

type ProductOptionsGroupProps = {
    group: RadioCheckboxOptionGroup;
    value: string[];
    onChange: (id: string) => void;
};

export function ProductOptionsGroup({ group, value, onChange }: ProductOptionsGroupProps) {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-4">
                <div>
                    <p className="font-bold text-neutral-700">{group.title}</p>
                    <span className="text-xs text-neutral-500">
                        escolha {group.max > 1 ? `até ${group.max}` : `até 1`}
                    </span>
                </div>
                {group.required && (
                    <span className="bg-neutral-700 text-white text-xs px-2 py-1 rounded font-bold">
                        obrigatório
                    </span>
                )}
            </div>
            <div className="px-4 py-2">
                {group.items.map((item) => (
                    <label key={item.id} className="flex items-center gap-2 py-2 cursor-pointer">
                        <input
                            type={group.type}
                            name={group.id}
                            checked={value.includes(item.id)}
                            onChange={() => onChange(item.id)}
                            className="accent-purple-600"
                        />
                        <span className="text-neutral-700">{item.label}</span>
                        {item.price && (
                            <span className="ml-auto font-bold text-purple-600">
                                +R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
}
