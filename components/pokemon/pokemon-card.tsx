'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle>
          #{url.slice(34)} {name.charAt(0).toUpperCase() + name.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardFooter className="block px-4">
        <Link href={`/pokemon/${name}`} passHref key={name}>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${name}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
