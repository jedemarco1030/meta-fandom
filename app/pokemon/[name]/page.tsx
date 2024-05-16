import React from 'react';

import PokemonDetails from '@/components/pokemon/pokemon-details';

const PokemonDetailsPage = ({ params }: { params: { name: string } }) => {
  return <PokemonDetails pokemonName={params.name} />;
};

export default PokemonDetailsPage;
