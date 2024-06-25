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
import type { Movie } from "@/types/movies";

interface MovieCardProps {
  movie: Movie;
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

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const voteAverageColor = getVoteAverageColor(movie.vote_average);
  const roundedRating = movie?.vote_average?.toFixed(2);

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle className="flex items-center justify-between">
          <span>{movie.title}</span>
          <span className={`rounded p-2 text-white ${voteAverageColor}`}>
            {movie.vote_average > 0 ? roundedRating : "N/A"}
          </span>
        </CardTitle>
        <CardDescription>{formatDate(movie.release_date)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {movie.poster_path && (
          <div className="relative mb-4 h-[40rem] w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} cover image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
              priority
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="block p-4">
        <Link href={`/movies/${movie.id}`} passHref>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${movie.title}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
