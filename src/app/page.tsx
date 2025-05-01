import { getCatalog } from '@/application/services/catalogService';
import { Header, Footer, SearchHeader } from '@/presentation/components';
import { Banner, Catalog } from '@/presentation/components/Screens/Home';

export default async function Home() {
    const catalog = await getCatalog();

    return (
        <div className="flex flex-col min-h-[100dvh] md:min-h-screen">
            <Header>
                <div className="mt-4">
                    <SearchHeader />
                </div>
            </Header>

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
