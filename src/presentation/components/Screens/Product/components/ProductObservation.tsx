type ProductObservationProps = {
    value: string;
    onChange: (v: string) => void;
};

export function ProductObservation({ value, onChange }: ProductObservationProps) {
    return (
        <div className="bg-white px-4 py-2">
            <textarea
                className="w-full border border-gray-200 p-2 text-sm resize-none"
                rows={2}
                placeholder="alguma observação do item? • opcional\nex: tirar algum ingrediente, ponto do prato"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
