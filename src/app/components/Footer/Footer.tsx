'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="flex justify-between items-center py-4 px-8 border-t border-gray-200">
            <p className="text-sm">Created with NextUI</p>
            <Link href="#" passHref className="text-sm hover:underline">
                Contact Us
            </Link>
        </div>
    );
};

export default Footer;
