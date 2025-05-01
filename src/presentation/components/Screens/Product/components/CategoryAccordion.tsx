'use client';

import Link from 'next/link';

import { Accordion } from '@/presentation/components/Accordion';
import { formatCurrency } from '@/utils/format/currency';

interface ProductItem {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    hasPromo?: boolean;
    isVegan?: boolean;
}

interface Category {
    id: number;
    name: string;
    icon: string;
    image: string;
    items: ProductItem[];
}

type CategoryAccordionProps = {
    categories: Category[];
    catalogId: string | number;
};

export function CategoryAccordion({ categories, catalogId }: CategoryAccordionProps) {
    return (
        <div className="flex flex-col gap-1 bg-neutral-100">
            {categories.map((category) => (
                <Accordion key={category.id} title={category.name} defaultOpen>
                    <div>
                        {category.items.map((product) => (
                            <Link
                                key={product.id}
                                href={`/catalog/${catalogId}/product/${product.id}`}
                                prefetch={false}
                            >
                                <div className="py-3 border-b border-gray-100 last:border-0 flex justify-between">
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-800">
                                                {product.title}
                                            </h3>
                                            {product.isVegan && (
                                                <span className="inline-flex items-center text-green-600 text-xs font-bold">
                                                    VEG
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="text-right min-w-[90px]">
                                        {product.originalPrice && (
                                            <p className="text-sm text-gray-400 line-through">
                                                {formatCurrency(product.originalPrice)}
                                            </p>
                                        )}
                                        <p
                                            className={`font-medium ${product.hasPromo ? 'text-green-600' : 'text-purple-600'}`}
                                        >
                                            {product.hasPromo && (
                                                <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded mr-1">
                                                    PROMO
                                                </span>
                                            )}
                                            {formatCurrency(product.price)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Accordion>
            ))}
        </div>
    );
}
