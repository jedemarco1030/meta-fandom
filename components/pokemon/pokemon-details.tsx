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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPokemonDetails } from "@/lib/poke-api";
import type { PokemonListDetails } from "@/types/pokemon";

const PokemonDetails = ({ pokemonName }: { pokemonName: string }) => {
  const [pokemon, setPokemon] = useState<PokemonListDetails | null>(null);
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

    fetchPokemon()
      .then(() => {
        console.log("Pokémon fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching Pokémon:", err);
      });

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

  const typeColors: Record<string, string> = {
    normal: "bg-[#A8A77A]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    electric: "bg-[#F7D02C]",
    grass: "bg-[#7AC74C]",
    ice: "bg-[#96D9D6]",
    fighting: "bg-[#C22E28]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    flying: "bg-[#A98FF3]",
    psychic: "bg-[#F95587]",
    bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]",
    ghost: "bg-[#735797]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]",
    fairy: "bg-[#D685AD]",
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-center text-3xl font-bold">
            #{pokemon.id} - {transformedName}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            <span className="block">
              {(pokemon.height / 10).toFixed(1)} meters
            </span>
            <span className="block">
              {(pokemon.weight / 10).toFixed(1)} kilograms
            </span>
            <span className="block">
              {pokemon.types.length > 0
                ? pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={`m-1 inline-block rounded-md px-3 font-bold text-white ${typeColors[t.type.name]}`}
                    >
                      {t.type.name.charAt(0).toUpperCase() +
                        t.type.name.slice(1)}
                    </span>
                  ))
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
          <h3 className="mb-4 text-xl font-bold">Base Stats</h3>
          {pokemon.stats.map((statObject) => {
            const statName = formatStatName(statObject.stat.name);
            const statValue = statObject.base_stat;

            return (
              <div className="mb-4 flex w-full items-center" key={statName}>
                <h3 className="w-1/3 text-lg">{statName}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-2/3">
                      <Progress
                        className="w-full bg-background"
                        value={(statValue / 255) * 100}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{statValue}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PokemonDetails;
