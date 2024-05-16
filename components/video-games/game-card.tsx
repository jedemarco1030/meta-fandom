'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: PlatformDetail[];
}

interface PlatformDetail {
  platform: Platform;
  released_at: string;
  requirements: Requirements;
}

interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface Requirements {
  minimum: string;
  recommended: string;
}

interface GameCardProps {
  game: Game;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>Released: {formatDate(game.released)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="mb-4">
          Platforms:{' '}
          {game.platforms?.length > 0
            ? game.platforms.map((p) => p.platform.name).join(', ')
            : 'N/A'}
        </div>
        <div className="mb-4">
          Metacritic Rating: {game.metacritic > 0 ? game.metacritic : 'N/A'}
        </div>
        {game.background_image && (
          <div className="relative mb-4 h-48 w-full">
            <Image
              src={game.background_image}
              alt={`${game.name} cover image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="block p-4">
        <Link href={`/video-games/${game.slug}`} passHref>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${game.name}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
