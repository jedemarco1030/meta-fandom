import React from "react";

import MovieDetails from "@/components/movies/movie-details";

const MovieDetailsPage = ({ params }: { params: { id: string } }) => {
  return <MovieDetails movieId={params.id} />;
};

export default MovieDetailsPage;
