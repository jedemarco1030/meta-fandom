import Pokemon from "@/components/pokemon/pokemon";
import { getPokemonList } from "@/lib/poke-api";

const PokemonPage = async () => {
  const pokemonList = await getPokemonList(1302, 0);

  return <Pokemon pokemonList={pokemonList} />;
};

export default PokemonPage;
