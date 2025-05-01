import { Nunito_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { StoreInitializer } from '@/presentation/components/StoreInitializer';

import './app.css';

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

export default function RootLayout(
    props: Readonly<{
        children: React.ReactNode;
        modal: React.ReactNode;
        payment: React.ReactNode;
    }>,
) {
    return (
        <html lang="en">
            <body className={`${nunitoSans.variable} antialiased`}>
                <StoreInitializer />
                {props.children}
                {props.modal}
                {props.payment}
                <ToastContainer />
            </body>
        </html>
    );
}
