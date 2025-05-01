import { Nunito_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { StoreInitializer } from '@/presentation/components/StoreInitializer';

import './app.css';
import { Header } from '@/presentation/components';

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

export default function RootLayout(
    props: Readonly<{
        children: React.ReactNode;
    }>,
) {
    return (
        <html lang="en">
            <body className={`${nunitoSans.variable} antialiased`}>
                <Header />
                <StoreInitializer />
                {props.children}
                <ToastContainer />
            </body>
        </html>
    );
}
