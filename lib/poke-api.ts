import type {
  PokemonListDetails,
  PokemonListResponse,
  PokemonListResult,
} from "@/types/pokemon";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<PokemonListResult[]> {
  try {
    const url = `${BASE_URL}/api/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch pokemon list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: PokemonListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function getPokemonDetails(
  name: string,
): Promise<PokemonListDetails | null> {
  try {
    const url = `${BASE_URL}/api/pokemon?name=${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for pokemon name: ${name}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    return null;
  }
}
