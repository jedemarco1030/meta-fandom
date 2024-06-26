import Link from "next/link";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Home = () => {
  return (
    <main className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      <section className="pb-16 pt-8">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="flex-1 p-4">
            <CardTitle className="mb-4 text-center text-3xl font-bold">
              Welcome to Meta Fandom
            </CardTitle>
            <CardDescription className="mb-8 text-center text-lg">
              Your ultimate destination for discovering and sharing your
              favorite games, Pokémon, movies, TV shows, and books.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <div>
              <h2 className="my-4 text-2xl font-semibold">Search for Games</h2>
              <p>
                Use our powerful search feature to find your next game to play.
                You can search by title, genre, developer, and more. View
                detailed information about each game to help you decide your
                next adventure.
              </p>
            </div>
            <div>
              <h2 className="my-4 text-2xl font-semibold">
                Search for Pokémon
              </h2>
              <p>
                Discover detailed information about your favorite Pokémon.
                Search by name or type to find the Pokémon you&apos;re looking
                for.
              </p>
            </div>
            <div>
              <h2 className="my-4 text-2xl font-semibold">Search for Movies</h2>
              <p>
                Find information about your favorite movies. Search by title,
                genre, or release date to discover movies you&apos;ll love to
                watch.
              </p>
            </div>
            <div>
              <h2 className="my-4 text-2xl font-semibold">
                Search for TV Shows
              </h2>
              <p>
                Explore detailed information about TV shows. Search by title,
                genre, or network to find your next binge-worthy series.
              </p>
            </div>
            <div>
              <h2 className="my-4 text-2xl font-semibold">Search for Books</h2>
              <p>
                Discover new books to read. Search by title, author, or genre to
                find your next favorite book.
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <div>
              <h2 className="my-2 text-2xl font-semibold">
                Register an Account
              </h2>
              <p>
                Join the Meta Fandom community by registering an account. With
                an account, you can save your favorite games, participate in
                discussions, and more.
              </p>
              <Link
                href="/auth/register"
                className="my-4 inline-block rounded bg-foreground px-4 py-2 text-background transition duration-150"
              >
                Register Now
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};
