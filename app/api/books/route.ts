import { NextResponse } from "next/server";

const OPEN_LIBRARY_SEARCH_API = "https://openlibrary.org/search.json";
const OPEN_LIBRARY_WORK_API = "https://openlibrary.org/works/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const workKey = searchParams.get("work_key");

  try {
    if (workKey) {
      const workUrl = `${OPEN_LIBRARY_WORK_API}${workKey}.json`;
      console.log(`Fetching data from: ${workUrl}`);

      const workResponse = await fetch(workUrl);

      if (!workResponse.ok) {
        const errorText = await workResponse.text();
        throw new Error(
          `Failed to fetch data from Open Library API: ${workResponse.status} - ${errorText}`,
        );
      }

      const workData = await workResponse.json();
      return NextResponse.json(workData);
    }

    const searchUrl = `${OPEN_LIBRARY_SEARCH_API}?q=${query}&limit=${limit}&offset=${offset}`;
    console.log(`Fetching data from: ${searchUrl}`);

    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      throw new Error(
        `Failed to fetch data from Open Library API: ${searchResponse.status} - ${errorText}`,
      );
    }

    const searchData = await searchResponse.json();

    return NextResponse.json(searchData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
