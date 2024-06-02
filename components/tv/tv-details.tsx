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
import { getTVDetails } from "@/lib/tmdb-api";
import type { TVShowDetails } from "@/types/tv";

const TVDetails = ({ seriesId }: { seriesId: string }) => {
  const [tv, setTV] = useState<TVShowDetails | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchTVShow() {
      try {
        const data = await getTVDetails(seriesId);
        if (data && isMounted) {
          setTV({
            ...data,
            overview: DOMPurify.sanitize(data.overview || ""),
          });
        } else if (isMounted) {
          setError("Failed to load TV data.");
        }
      } catch (err) {
        console.error("Failed to fetch TV show details:", err);
        if (isMounted) setError("Failed to load TV show data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTVShow()
      .then(() => {
        console.log("TV show fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching TV show:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [seriesId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 size-16 animate-spin" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-center text-3xl font-bold">
            {tv?.name}
          </CardTitle>
          <CardDescription
            className="grid gap-4"
            dangerouslySetInnerHTML={{ __html: tv?.overview || "" }}
          />
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {tv?.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`}
              alt={`${tv?.name} cover image`}
              height={1000}
              width={1000}
              className="rounded"
              priority={false}
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mb-4 w-full">
            <h3 className="text-xl font-bold">Seasons</h3>
            <div className="mb-4 w-full">{tv?.number_of_seasons}</div>
            <h3 className="text-xl font-bold">Episodes</h3>
            <div className="mb-4 w-full">{tv?.number_of_episodes}</div>
            <h3 className="text-xl font-bold">Genre</h3>
            {tv?.genres && tv?.genres.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {tv?.genres.map((tvGenre) => (
                  <Badge key={tvGenre.id} className="inline-block">
                    {tvGenre.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "N/A"
            )}
            <h3 className="text-xl font-bold">Production Companies</h3>
            {tv?.production_companies &&
            tv?.production_companies?.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {tv?.production_companies.map((company) => (
                  <Badge key={company.id} className="inline-block">
                    {company.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "N/A"
            )}
            <h3 className="text-xl font-bold">Production Countries</h3>
            {tv?.production_countries &&
            tv?.production_countries?.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {tv?.production_countries.map((country) => (
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

export default TVDetails;
