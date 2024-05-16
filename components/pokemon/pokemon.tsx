"use client";

import React, { useState } from "react";

import PokemonCard from "@/components/pokemon/pokemon-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PokemonSearchProps {
  pokemonList: any;
}

const Pokemon = ({ pokemonList }: PokemonSearchProps) => {
  const [searchText, setSearchText] = useState("");

  console.log(pokemonList);

  const searchFilter = (pokemonArray: any) => {
    return pokemonArray.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);

  return (
    <div className="mx-auto w-full max-w-screen-md p-4">
      <div className="my-4">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="flex-1 p-4">
            <CardTitle className="mb-4 text-center text-3xl font-bold">
              Welcome to Pokémon Search
            </CardTitle>
            <CardDescription className="mb-4 text-center text-lg">
              Explore a vast collection of Pokémon.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-4 flex-1 p-4">
            <div className="mb-4 text-center text-lg">
              Use the input field below to search for Pokémon by name.
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Input
              type="text"
              value={searchText}
              autoComplete="off"
              id="pokemonName"
              placeholder="Search for Pokémon..."
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-4 w-full rounded-lg bg-input"
            />
          </CardFooter>
        </Card>
      </div>

      {pokemonList.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPokemonList.map((pokemon: any) => {
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            );
          })}
        </div>
      )}
      {!pokemonList.length && (
        <p className="text-center">
          No Pokémon found. Try adjusting your search.
        </p>
      )}
    </div>
  );
};

export default Pokemon;
