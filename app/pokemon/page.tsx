import Pokemon from "@/components/pokemon/pokemon";
import { getPokemonList } from "@/lib/poke-api";

const PokemonPage = async () => {
  const pokemonList = await getPokemonList(20, 0);

  return <Pokemon initialPokemonList={pokemonList} />;
};

export default PokemonPage;
