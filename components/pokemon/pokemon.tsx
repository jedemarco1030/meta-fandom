"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import PokemonCard from "@/components/pokemon/pokemon-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getPokemonList } from "@/lib/poke-api";
import type { PokemonListResult } from "@/types/pokemon";

interface PokemonSearchProps {
  initialPokemonList: PokemonListResult[];
}

const Pokemon = ({ initialPokemonList }: PokemonSearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [displayedPokemonList, setDisplayedPokemonList] = useState<
    PokemonListResult[]
  >(initialPokemonList.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(10);
  const [totalPokemonList, setTotalPokemonList] =
    useState<PokemonListResult[]>(initialPokemonList);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const limit = 20000;
        const fetchedPokemon = await getPokemonList(limit, 0);
        setTotalPokemonList(fetchedPokemon);
        setPokemonList(fetchedPokemon);
        setDisplayedPokemonList(fetchedPokemon.slice(0, 10));
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
        setError("Failed to load Pokémon list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!initialPokemonList.length) {
      fetchAllPokemon()
        .then(() => {
          console.log("All Pokémon fetched successfully");
        })
        .catch((err) => {
          console.error("Error in fetching all Pokémon:", err);
        });
    }
  }, [initialPokemonList]);

  const loadMorePokemon = () => {
    const nextOffset = offset + 10;
    setDisplayedPokemonList((prevList) => [
      ...prevList,
      ...pokemonList.slice(offset, nextOffset),
    ]);
    setOffset(nextOffset);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    if (value) {
      const filteredList = totalPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase()),
      );
      setPokemonList(filteredList);
      setDisplayedPokemonList(filteredList.slice(0, 10));
      setOffset(10);
    } else {
      setPokemonList(totalPokemonList);
      setDisplayedPokemonList(totalPokemonList.slice(0, 10));
      setOffset(10);
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
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
            <div className="mb-4 text-center text-lg">
              Can&apos;t find what you&apos;re looking for?
            </div>
            <div className="mb-4 text-center text-lg">
              Click the <strong>&quot;Load More&quot;</strong> button to
              discover more games.
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Input
              type="text"
              value={searchText}
              autoComplete="off"
              id="pokemonName"
              placeholder="Search for Pokémon..."
              onChange={handleSearchChange}
              className="mb-4 w-full rounded-lg bg-background"
            />
          </CardFooter>
        </Card>
      </div>

      {loading && (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 size-16 animate-spin" />
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedPokemonList.length > 0 &&
          displayedPokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
      </div>

      {!displayedPokemonList.length && !loading && !error && (
        <p className="text-center">
          No Pokémon found. Try adjusting your search.
        </p>
      )}

      {!searchText && !error && (
        <Button className="mt-4 block w-full" onClick={loadMorePokemon}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default Pokemon;
