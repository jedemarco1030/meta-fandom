import { NextResponse } from "next/server";

const TMDB_API = "https://api.themoviedb.org/3/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const seriesId = searchParams.get("series_id");

  try {
    let url = `${TMDB_API}discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`;

    if (seriesId) {
      url = `${TMDB_API}tv/${seriesId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    } else if (query) {
      url = `${TMDB_API}search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}?language=en-US&include_adult=false&sort_by=vote_count.desc`;
    }

    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data from TMDB API: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
