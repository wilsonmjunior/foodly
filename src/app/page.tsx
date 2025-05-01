import { getCatalog } from '@/application/services/catalogService';
import { Footer, SearchHeader } from '@/presentation/components';
import { Banner, Catalog } from '@/presentation/components/Screens/Home';

export default async function Home() {
    const catalog = await getCatalog();

    return (
        <div className="flex flex-col min-h-[100dvh] md:min-h-screen">
            <SearchHeader />

            <Banner />

            <div className="mt-4">
                <Catalog data={catalog} />
            </div>

            <div className="mt-4">
                <Footer />
            </div>
        </div>
    );
}
