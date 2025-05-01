'use client';

import { useRouter } from 'next/navigation';

import { Product } from '@/domain/entities/Product';
import { Button, ProductQuantity } from '@/presentation/components';
import { useProductDetails } from '@/presentation/hooks';
import {
    ProductImage,
    ProductInfo,
    ProductObservation,
    ProductOptionsGroup,
    ProductOptionsQuantityGroup,
} from './components';

type ProductDetailsProps = {
    product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
    const {
        addedToTicket,
        additional,
        additionalGroup,
        drinks,
        drinksGroup,
        calculateTotalPrice,
        handleAddToTicket,
        note,
        setDrinks,
        cutleryGroup,
        setAdditional,
        cutlery,
        setCutlery,
        setNote,
    } = useProductDetails({ product });

    const router = useRouter();

    return (
        <>
            <div className="flex-1 flex flex-col gap-1 pb-4">
                <ProductImage src={product.image || ''} alt={product.title} />

                <ProductInfo
                    title={product.title}
                    price={product.price}
                    description={product.description}
                />

                <ProductQuantity
                    productId={product.id}
                    productPrice={product.price}
                    totalPrice={calculateTotalPrice}
                    onAddProduct={handleAddToTicket}
                    isAddedToCart={addedToTicket}
                />

                {drinksGroup && (
                    <ProductOptionsQuantityGroup
                        group={{
                            ...drinksGroup,
                            items: drinks,
                        }}
                        onChange={(id, quantity) =>
                            setDrinks((prev) =>
                                prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
                            )
                        }
                    />
                )}

                {cutleryGroup && (
                    <ProductOptionsGroup
                        group={cutleryGroup}
                        value={cutlery}
                        onChange={(id) => setCutlery((prev) => (prev.includes(id) ? [] : [id]))}
                    />
                )}

                {additionalGroup && (
                    <ProductOptionsGroup
                        group={additionalGroup}
                        value={additional}
                        onChange={(id) =>
                            setAdditional((prev) =>
                                prev.includes(id)
                                    ? prev.filter((v) => v !== id)
                                    : prev.length < (additionalGroup.max || 2)
                                      ? [...prev, id]
                                      : prev,
                            )
                        }
                    />
                )}

                <ProductObservation value={note} onChange={setNote} />
            </div>

            {addedToTicket ? (
                <div className="flex mb-4 mx-4">
                    <Button
                        title="ver ticket"
                        size="lg"
                        className="flex-1"
                        onClick={() => router.push('/ticket')}
                    />
                </div>
            ) : null}
        </>
    );
}
