import Image from 'next/image';

type ProductImageProps = {
    src: string;
    alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
    return (
        <div className="w-full aspect-[4/2.2] relative">
            <Image src={src} alt={alt} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-600 rounded-b-xl" />
        </div>
    );
}
