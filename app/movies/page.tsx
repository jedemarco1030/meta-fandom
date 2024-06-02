import React from "react";

import Movies from "@/components/movies/movies";
import { getDiscoverMovies, getMoviesList } from "@/lib/tmdb-api";

const MoviesPage = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);

  const moviesList = search
    ? await getMoviesList(search, page)
    : await getDiscoverMovies(page);

  return (
    <Movies
      initialMovies={moviesList}
      initialSearch={search}
      initialPage={page}
    />
  );
};

export default MoviesPage;
