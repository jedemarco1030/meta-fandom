"use client";

import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getVideoGameDetails } from "@/lib/rawg-api";
import type { GameDetail } from "@/types/video-games";

const formatStatusName = (status: string): string => {
  switch (status) {
    case "yet":
      return "Yet";
    case "owned":
      return "Owned";
    case "beaten":
      return "Beaten";
    case "toplay":
      return "To Play";
    case "dropped":
      return "Dropped";
    case "playing":
      return "Playing";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const formatNumber = (number: number): string => {
  return number.toLocaleString();
};

const VideoGameDetails = ({ gameId }: { gameId: string }) => {
  const [videoGame, setVideoGame] = useState<GameDetail | null>(null);
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
        console.log("Game fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching game:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [gameId]);

  const addedByStatus = videoGame?.added_by_status || {};
  const ratings = videoGame?.ratings || [];

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
            {videoGame?.name}
          </CardTitle>
          <CardDescription
            className="grid gap-4"
            dangerouslySetInnerHTML={{ __html: videoGame?.description || "" }}
          />
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {videoGame?.background_image_additional && (
            <Image
              src={videoGame.background_image_additional}
              alt={`${videoGame.name} cover image`}
              height={1000}
              width={1000}
              className="rounded"
              priority={false}
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mt-8 w-full">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Added By Status</h3>
              <span className="text-xl font-bold">
                {videoGame?.playtime
                  ? `${videoGame.playtime} hours to beat`
                  : "N/A"}
              </span>
            </div>
            {Object.entries(addedByStatus).map(([status, value]) => {
              const percentage = (value / (videoGame?.added || 1)) * 100;
              return (
                <div className="mb-4 flex w-full items-center" key={status}>
                  <h3 className="w-1/3 text-lg">{formatStatusName(status)}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-2/3">
                        <Progress
                          className="w-full bg-background"
                          value={percentage}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{formatNumber(value)}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
          <div className="mt-8 w-full">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Ratings</h3>
              <span className="text-xl font-bold">
                {videoGame?.rating ?? "N/A"} / 5.00
              </span>
            </div>
            {ratings.map((rating: any) => {
              const percentage = rating.percent;
              return (
                <div className="mb-4 flex w-full items-center" key={rating.id}>
                  <h3 className="w-1/3 text-lg">
                    {rating.title.charAt(0).toUpperCase() +
                      rating.title.slice(1)}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-2/3">
                        <Progress
                          className="w-full bg-background"
                          value={percentage}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{formatNumber(rating.count)}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideoGameDetails;
