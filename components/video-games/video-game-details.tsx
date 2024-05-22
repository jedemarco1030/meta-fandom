"use client";

import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GameDetail as GameDetailType } from "@/lib/rawg-api";
import { getVideoGameDetails } from "@/lib/rawg-api";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const VideoGameDetails = ({ gameId }: { gameId: string }) => {
  const [videoGame, setVideoGame] = useState<GameDetailType | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVideoGame() {
      try {
        const data = await getVideoGameDetails(gameId);
        if (data && isMounted) {
          setVideoGame({
            ...data,
            description: DOMPurify.sanitize(data.description || ""),
          });
        } else if (isMounted) {
          setError("Failed to load game data.");
        }
      } catch (err) {
        console.error("Failed to fetch video game details:", err);
        if (isMounted) setError("Failed to load game data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVideoGame()
      .then(() => {
        console.log("All games fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching all games:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [gameId]);

  const formattedReleased = useMemo(() => {
    return videoGame?.released ? formatDate(videoGame.released) : "N/A";
  }, [videoGame?.released]);

  if (loading) return <Loader2 className="mr-2 size-4 animate-spin" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle>{videoGame?.name}</CardTitle>
          <CardDescription
            className="grid gap-4"
            dangerouslySetInnerHTML={{ __html: videoGame?.description || "" }}
          />
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {videoGame?.background_image && (
            <Image
              src={videoGame.background_image}
              alt={`${videoGame.name} cover image`}
              height={1000}
              width={1000}
              className="rounded"
              priority={false}
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mb-4">
            Platforms:{" "}
            {videoGame?.platforms?.length
              ? videoGame.platforms.map((p) => p.platform.name).join(", ")
              : "N/A"}
          </div>
          <div className="mb-4">
            Metacritic Rating: {videoGame?.metacritic ?? "N/A"}
          </div>
          <div className="mb-4">Released: {formattedReleased}</div>
          <div className="mb-4">
            Website:{" "}
            {videoGame?.website ? (
              <Link href={videoGame.website} target="_blank">
                Visit Website
              </Link>
            ) : (
              "N/A"
            )}
          </div>
          <div className="mb-4">Rating: {videoGame?.rating ?? "N/A"}</div>
          <div className="mb-4">
            Playtime:{" "}
            {videoGame?.playtime ? `${videoGame.playtime} hours` : "N/A"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideoGameDetails;
