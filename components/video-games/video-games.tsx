"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GameCard from "@/components/video-games/game-card";
import { getVideoGamesList } from "@/lib/rawg-api";

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

const VideoGames = ({ videoGameList }: { videoGameList: Game[] }) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>(videoGameList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const fetchedGames = await getVideoGamesList(search, page);
        setGames((prevGames) =>
          page === 1 ? fetchedGames : [...prevGames, ...fetchedGames],
        );
        setHasMore(fetchedGames.length > 0);
      } catch (error) {
        console.error("Error fetching games:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGames().catch((err) =>
      console.error("Failed to fetch games on mount:", err),
    );
  }, [search, page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-md p-4">
      <div className="my-4">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="flex-1 p-4">
            <CardTitle className="mb-4 text-center text-3xl font-bold">
              Welcome to Game Search
            </CardTitle>
            <CardDescription className="mb-4 text-center text-lg">
              Explore a vast collection of video games.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-4 flex-1 p-4">
            <div className="mb-4 text-center text-lg">
              Use the input field below to search for games by name.
            </div>
            <div className="mb-4 text-center text-lg">
              Can&apos;t find what you&apos;re looking for?
            </div>
            <div className="mb-4 text-center text-lg">
              Click the <strong>&quot;Load More&quot;</strong> button to
              discover more games.
            </div>
            <div className="mb-4 text-center text-lg">
              Dive deeper into your gaming adventure by adding games to your{" "}
              <strong>Favorites</strong>.
            </div>
            <div className="mb-4 text-center text-lg">
              You can easily <strong>Add</strong> or <strong>Remove</strong>{" "}
              games from your favorites list for each game.
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Input
              type="text"
              placeholder="Search for a game..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                setGames([]);
              }}
              className="mb-4 w-full rounded-lg bg-input"
            />
          </CardFooter>
        </Card>
      </div>

      {games.length > 0 && !loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      {!games.length && !loading && (
        <p className="text-center">
          No games found. Try adjusting your search.
        </p>
      )}
      {hasMore && !loading && (
        <Button className="mt-4 block w-full" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default VideoGames;
