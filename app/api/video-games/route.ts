import { NextResponse } from "next/server";

const RAWG_API = "https://api.rawg.io/api/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const gameId = searchParams.get("id");

  try {
    const url = gameId
      ? `${RAWG_API}games/${gameId}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      : `${RAWG_API}games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${search}&page_size=10&page=${page}`;

    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data from RAWG API: ${response.status} - ${errorText}`,
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
