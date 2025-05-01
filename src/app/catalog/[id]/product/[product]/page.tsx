import { getProductDetails } from '@/application/services/productsService';
import { Header, Footer } from '@/presentation/components';
import { ProductDetails } from '@/presentation/components/Screens/Product/ProductDetails';

type ProductScreenParams = {
    params: {
        product: string;
        id: string;
    };
};

export default async function ProductScreen({ params }: ProductScreenParams) {
    const productId = parseInt(params.product, 10);
    const product = await getProductDetails({ productId });

    if (!product) return <div>Produto não encontrado</div>;

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header />

            <ProductDetails product={product} />

            <Footer />
        </div>
    );
}
