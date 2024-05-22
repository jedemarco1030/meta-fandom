"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PokemonDetails as PokemonDetailsType } from "@/lib/poke-api";
import { getPokemonDetails } from "@/lib/poke-api";

const PokemonDetails = ({ pokemonName }: { pokemonName: string }) => {
  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      try {
        const data = await getPokemonDetails(pokemonName);
        if (isMounted) {
          setPokemon(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch pokemon details:", err);
        if (isMounted) {
          setError("Failed to load pokemon data.");
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, [pokemonName]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 size-16 animate-spin" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  const formatStatName = (statName: string): string => {
    switch (statName) {
      case "hp":
        return "HP";
      case "special-attack":
        return "Special Attack";
      case "special-defense":
        return "Special Defense";
      default:
        return statName.charAt(0).toUpperCase() + statName.slice(1);
    }
  };

  const transformName = (name: string) => {
    return name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const transformedName = transformName(pokemonName);

  if (!pokemon) return null;

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-center text-3xl font-bold">
            {transformedName}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            <span className="block">Height: {pokemon.height}</span>
            <span className="block">Weight: {pokemon.weight}</span>
            <span className="block">
              Types:{" "}
              {pokemon.types.length > 0
                ? pokemon.types
                    .map(
                      (t) =>
                        t.type.name.charAt(0).toUpperCase() +
                        t.type.name.slice(1),
                    )
                    .join(", ")
                : "N/A"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {pokemon.sprites.other["official-artwork"].front_default && (
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={`${pokemon.name} artwork`}
              height={300}
              width={300}
              className="m-auto rounded"
              priority
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          {pokemon.stats.map((statObject) => {
            const statName = formatStatName(statObject.stat.name);
            const statValue = statObject.base_stat;

            return (
              <div className="mb-4 flex w-full items-center" key={statName}>
                <h3 className="w-1/3 text-lg">
                  {statName}: {statValue}
                </h3>
                <Progress className="w-2/3" value={statValue} />
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PokemonDetails;
