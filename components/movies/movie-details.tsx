"use client";

import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovieDetails } from "@/lib/tmdb-api";
import type { Movie } from "@/types/movies";

const MovieDetails = ({ movieId }: { movieId: string }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchMovie() {
      try {
        const data = await getMovieDetails(movieId);
        if (data && isMounted) {
          setMovie({
            ...data,
            overview: DOMPurify.sanitize(data.overview || ""),
          });
        } else if (isMounted) {
          setError("Failed to load movie data.");
        }
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        if (isMounted) setError("Failed to load movie data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMovie()
      .then(() => {
        console.log("Movie fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching movie:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 size-16 animate-spin" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-center text-3xl font-bold">
            {movie?.title}
          </CardTitle>
          <CardDescription
            className="grid gap-4"
            dangerouslySetInnerHTML={{ __html: movie?.overview || "" }}
          />
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {movie?.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={`${movie?.title} cover image`}
              height={1000}
              width={1000}
              className="rounded"
              priority={false}
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mb-4 w-full">
            <h3 className="text-xl font-bold">Budget</h3>
            <div className="mb-4 w-full">
              {formatCurrency(movie?.budget || 0)}
            </div>
            <h3 className="text-xl font-bold">Revenue</h3>
            <div className="mb-4 w-full">
              {formatCurrency(movie?.revenue || 0)}
            </div>
            <h3 className="text-xl font-bold">Runtime</h3>
            <div className="mb-4 w-full">{movie?.runtime} minutes</div>
            <h3 className="text-xl font-bold">Genre</h3>
            {movie?.genres && movie?.genres.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {movie?.genres.map((genre) => (
                  <Badge key={genre.id} className="inline-block">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "N/A"
            )}
            <h3 className="text-xl font-bold">Production Companies</h3>
            {movie?.production_companies &&
            movie?.production_companies?.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {movie?.production_companies.map((company) => (
                  <Badge key={company.id} className="inline-block">
                    {company.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "N/A"
            )}
            <h3 className="text-xl font-bold">Production Countries</h3>
            {movie?.production_countries &&
            movie?.production_countries?.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {movie?.production_countries.map((country) => (
                  <Badge key={country.name} className="inline-block">
                    {country.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "N/A"
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieDetails;
