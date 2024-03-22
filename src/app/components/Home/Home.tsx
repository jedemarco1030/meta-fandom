'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to Meta Fandom!</h1>
            <p className="mb-4">
                Your ultimate source for all of your fandom related needs. Explore, connect, and contribute to the vast universe of fandoms.
            </p>
            <p className="mb-6">
                You can <Link href="/register" passHref className="text-blue-600 underline">register</Link> for the site, <Link href="/login" passHref className="text-blue-600 underline">login</Link>, or <Link href="/get-started" passHref className="text-blue-600 underline">click here to get started</Link>.
            </p>
            <Link href="#" passHref>
                <Button variant="shadow" color="primary" className="w-auto">Get Started</Button>
            </Link>
        </div>
    );
};

export default Home;
