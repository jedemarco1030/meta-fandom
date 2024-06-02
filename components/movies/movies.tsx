"use client";

import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import MovieCard from "@/components/movies/movie-card";
import { SkeletonCard } from "@/components/skeleton-card";
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
import { getDiscoverMovies, getMoviesList } from "@/lib/tmdb-api";
import type { Movie } from "@/types/movies";

interface MovieSearchProps {
  initialMovies: Movie[];
  initialSearch: string;
  initialPage: number;
}

const Movies = ({
  initialMovies,
  initialSearch,
  initialPage,
}: MovieSearchProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMovies = search
        ? await getMoviesList(search, page)
        : await getDiscoverMovies(page);
      setMovies((prevMovies) =>
        page === 1 ? fetchedMovies : [...prevMovies, ...fetchedMovies],
      );
      setHasMore(fetchedMovies.length > 0);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchMovies().catch((err) => console.error("Failed to load movies:", err));
  }, [fetchMovies]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPage(1);
    setMovies([]);
    debouncedSearch(value);
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <div className="my-4">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="flex-1 p-4">
            <CardTitle className="mb-4 text-center text-3xl font-bold">
              Welcome to Movie Search
            </CardTitle>
            <CardDescription className="mb-4 text-center text-lg">
              Explore a vast collection of movies.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-4 flex-1 p-4">
            <div className="mb-4 text-center text-lg">
              Use the input field below to search for movies by name.
            </div>
            <div className="mb-4 text-center text-lg">
              Can&apos;t find what you&apos;re looking for?
            </div>
            <div className="mb-4 text-center text-lg">
              Click the <strong>&quot;Load More&quot;</strong> button to
              discover more movies.
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Input
              type="text"
              placeholder="Search for a movie..."
              onChange={handleSearchChange}
              className="mb-4 w-full rounded-lg bg-background"
            />
          </CardFooter>
        </Card>
      </div>

      {loading && page === 1 && (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="mr-2 size-16 animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        {loading &&
          page > 1 &&
          Array.from({ length: 6 }).map(() => <SkeletonCard key={uuidv4()} />)}
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {!movies.length && !loading && !error && (
        <p className="text-center">
          No movies found. Try adjusting your search.
        </p>
      )}

      {hasMore && !loading && !error && (
        <Button className="mt-4 block w-full" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default Movies;
