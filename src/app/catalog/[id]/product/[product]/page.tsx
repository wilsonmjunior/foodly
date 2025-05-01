import { getProductDetails } from '@/application/services/productsService';
import { Footer, NotFoundError, ToastError } from '@/presentation/components';
import { ProductDetails } from '@/presentation/components/Screens/Product/ProductDetails';

type ParamsType = Promise<{ id: string; product: string }>;

type PageProps = {
    params: ParamsType;
};

export default async function ProductPage({ params }: PageProps) {
    let product = null;
    let error = '';

    try {
        const productId = parseInt((await params).product, 10);
        product = await getProductDetails({ productId });
    } catch (err: unknown) {
        const appError = err as { message: string };
        error = appError.message;
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            {product ? (
                <>
                    <ProductDetails product={product} />

                    <Footer />

                    <ToastError message={error} />
                </>
            ) : (
                <NotFoundError message="produto não encontrado" />
            )}
        </div>
    );
}
