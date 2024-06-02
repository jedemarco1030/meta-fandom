"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TVShowDetails } from "@/types/tv";

interface TVCardProps {
  tv: TVShowDetails;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getVoteAverageColor = (rating: number) => {
  if (rating >= 8) {
    return "bg-green-500";
  }
  if (rating >= 6.5 && rating < 8) {
    return "bg-yellow-500";
  }
  if (rating > 0 && rating < 6.5) {
    return "bg-red-500";
  }
  return "bg-gray-500";
};

const TVCard: React.FC<TVCardProps> = ({ tv }) => {
  const voteAverageColor = getVoteAverageColor(tv.vote_average);
  const roundedRating = tv?.vote_average?.toFixed(2);

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle className="flex items-center justify-between">
          <span>{tv.name}</span>
          <span className={`rounded p-2 text-white ${voteAverageColor}`}>
            {tv.vote_average > 0 ? roundedRating : "N/A"}
          </span>
        </CardTitle>
        <CardDescription>{formatDate(tv.first_air_date)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {tv.poster_path && (
          <div className="relative mb-4 h-48 w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
              alt={`${tv.name} cover image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
              priority
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="block p-4">
        <Link href={`/tv/${tv.id}`} passHref>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${tv.name}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TVCard;
