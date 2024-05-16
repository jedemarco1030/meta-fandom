"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const [videoGame, setVideoGame] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchVideoGame() {
      try {
        const data = await getVideoGameDetails(gameId);
        if (data) {
          data.description = DOMPurify.sanitize(data.description || "");
          if (data.released) {
            formatDate(data.released);
          }
          setVideoGame(data);
        } else {
          setError("Failed to load game data.");
        }
      } catch (err) {
        console.error("Failed to fetch video game details:", err);
        setError("Failed to load game data.");
      }
    }

    fetchVideoGame();
  }, [gameId]);

  if (error) return <p>{error}</p>;
  if (!videoGame) return <p>Loading...</p>;

  return (
    <div className="mx-auto w-full max-w-screen-md p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle>{videoGame.name}</CardTitle>
          <CardDescription
            className="grid gap-4"
            dangerouslySetInnerHTML={{ __html: videoGame.description }}
          />
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {videoGame.background_image && (
            <Image
              src={videoGame.background_image}
              alt={`${videoGame.name} cover image`}
              height={1000}
              width={1000}
              className="rounded"
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mb-4">
            Platforms:{" "}
            {videoGame.platforms?.length > 0
              ? videoGame.platforms
                  .map((p: { platform: { name: any } }) => p.platform.name)
                  .join(", ")
              : "N/A"}
          </div>
          <div className="mb-4">
            Metacritic Rating: {videoGame.metacritic || "N/A"}
          </div>
          <div className="mb-4">
            Released: {videoGame.formattedReleased || "N/A"}
          </div>
          <div className="mb-4">
            Website:{" "}
            {videoGame.website ? (
              <Link href={videoGame.website} target="_blank">
                Visit Website
              </Link>
            ) : (
              "N/A"
            )}
          </div>
          <div className="mb-4">Rating: {videoGame.rating || "N/A"}</div>
          <div className="mb-4">
            Playtime: {`${videoGame.playtime} hours` || "N/A"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideoGameDetails;
