const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<any> {
  try {
    const url = `${POKEMON_API}pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch pokemon list");
    return data.results;
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    return [];
  }
}

export async function getPokemonDetails(name: string): Promise<any> {
  try {
    const url = `${POKEMON_API}pokemon/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok)
      throw new Error(`Failed to fetch details for pokemon: ${name}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for Pokemon ${name}:`, error);
    return null;
  }
}
