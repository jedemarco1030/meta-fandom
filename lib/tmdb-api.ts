import type { Movie, MovieListResponse } from "@/types/movies";
import type { TVListResponse, TVShowDetails } from "@/types/tv";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getMoviesList(
  query: string,
  page: number,
): Promise<Movie[]> {
  try {
    const url = `${BASE_URL}/api/movies?query=${query}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: MovieListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching movie list:", error);
    return [];
  }
}

export async function getMovieDetails(movieId: string): Promise<Movie | null> {
  try {
    const url = `${BASE_URL}/api/movies?movie_id=${movieId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export async function getDiscoverMovies(page: number): Promise<Movie[]> {
  try {
    const url = `${BASE_URL}/api/movies?page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch discovered movies list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: MovieListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching discovered movies list:", error);
    return [];
  }
}

export async function getTVList(
  query: string,
  page: number,
): Promise<TVShowDetails[]> {
  try {
    const url = `${BASE_URL}/api/tv?query=${query}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch TV list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: TVListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching TV list:", error);
    return [];
  }
}

export async function getDiscoverTV(page: number): Promise<TVShowDetails[]> {
  try {
    const url = `${BASE_URL}/api/tv?page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch discovered TV list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: TVListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching discovered TV list:", error);
    return [];
  }
}

export async function getTVDetails(
  seriesId: string,
): Promise<TVShowDetails | null> {
  try {
    const url = `${BASE_URL}/api/tv?series_id=${seriesId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for TV ID: ${seriesId}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching TV details:", error);
    return null;
  }
}
