"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
}

const transformName = (name: string) => {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const id = url.split("/").filter(Boolean).pop();
  const transformedName = transformName(name);

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle>
          #{id} - {transformedName}
        </CardTitle>
      </CardHeader>
      <CardFooter className="block px-4">
        <Link href={`/pokemon/${name}`} passHref key={name}>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${name}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
