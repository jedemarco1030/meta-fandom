import type {Metadata} from 'next';
import './globals.css';
import React from "react";
import { Providers } from '@/app/providers'
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

export const metadata: Metadata = {
    title: "Meta Fandom",
    description: "A source for all of your fandom related needs ",
};

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <title>Meta Fandom</title>
        </head>
        <body>
            <Providers>
                <div className="flex flex-col min-h-screen">
                    <Header />
                        <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
            </Providers>
        </body>
        </html>
    );
};

export default RootLayout;
