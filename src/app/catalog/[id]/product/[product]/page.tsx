import { getProductDetails } from '@/application/services/productsService';
import { Product } from '@/domain/entities/Product';
import { Header, Footer, ToastError } from '@/presentation/components';
import { ProductDetails } from '@/presentation/components/Screens/Product/ProductDetails';

type ProductPageParams = {
    params: {
        product: string;
        id: string;
    };
};

export default async function ProductPage({ params }: ProductPageParams) {
    let product = {} as Product;
    let error = '';

    try {
        const productId = parseInt(params.product, 10);
        product = await getProductDetails({ productId });
    } catch (err: unknown) {
        const appError = err as { message: string };
        error = appError.message;
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header />

            <ProductDetails product={product} />

            <Footer />

            <ToastError message={error} />
        </div>
    );
}
