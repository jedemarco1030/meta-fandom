'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getPokemonDetails } from '@/lib/poke-api';

const PokemonDetails = ({ pokemonName }: { pokemonName: string }) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemonDetails(pokemonName);
        setPokemon(data);
      } catch (err) {
        console.error('Failed to fetch pokemon details:', err);
        setError('Failed to load pokemon data.');
      }
    }

    fetchPokemon();
  }, [pokemonName]);

  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="mx-auto w-full max-w-screen-md p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </CardTitle>
          <CardDescription>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>
              Types:{' '}
              {pokemon.types?.length > 0
                ? pokemon.types
                    .map(
                      (t: { type: { name: any } }) =>
                        t.type.name.charAt(0).toUpperCase() +
                        t.type.name.slice(1),
                    )
                    .join(', ')
                : 'N/A'}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {pokemon.sprites.other['official-artwork'].front_default && (
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={`${pokemon.name} cover image`}
              height={300}
              width={300}
              className="m-auto rounded"
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          {pokemon.stats.map((statObject: any) => {
            const statName = statObject.stat.name;
            const statValue = statObject.base_stat;

            return (
              <div
                className="flex items-stretch"
                style={{ width: '500px' }}
                key={statName}
              >
                <h3 className="w-2/4 p-3">
                  {statName.charAt(0).toUpperCase() + statName.slice(1)}:{' '}
                  {statValue}
                </h3>
                <Progress className="m-auto w-2/4" value={statValue} />
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PokemonDetails;
