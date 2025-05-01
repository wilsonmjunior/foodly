import { Icon } from './Icon';

type SumQuantityProps = {
    quantity: number;
    onDecrement(): void;
    onIncrement(): void;
};

export function SumQuantity({ quantity, onDecrement, onIncrement }: SumQuantityProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                className={`${quantity !== 1 ? 'w-8 h-8 rounded-full border border-teal-400' : ''} flex items-center justify-center text-lg text-teal-400`}
                onClick={onDecrement}
                type="button"
            >
                {quantity === 1 ? (
                    <Icon name="Trash" size={26} />
                ) : (
                    <Icon name="Minus" size={16} weight="bold" />
                )}
            </button>
            <span className="text-center font-bold text-neutral-700">{quantity}</span>
            <button
                className="w-8 h-8 rounded-full border border-teal-400 flex items-center justify-center text-lg text-teal-400"
                onClick={onIncrement}
                type="button"
            >
                <Icon name="Plus" size={16} weight="bold" />
            </button>
        </div>
    );
}
