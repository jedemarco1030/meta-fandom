import { NextResponse } from "next/server";

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const pokemonName = searchParams.get("name");

  try {
    const url = pokemonName
      ? `${POKEMON_API}pokemon/${pokemonName}`
      : `${POKEMON_API}pokemon?limit=${limit}&offset=${offset}`;

    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data from Poke API: ${response.status} - ${errorText}`,
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
