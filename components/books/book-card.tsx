"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Book } from "@/types/books";

interface BookCardProps {
  book: Book;
}

const getVoteAverageColor = (rating: number) => {
  if (rating >= 3.5) {
    return "bg-green-500";
  }
  if (rating >= 2 && rating < 3.5) {
    return "bg-yellow-500";
  }
  if (rating > 0 && rating < 2) {
    return "bg-red-500";
  }
  return "bg-gray-500";
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const voteAverageColor = getVoteAverageColor(book.ratings_average);
  const roundedRating = book?.ratings_average?.toFixed(2);
  const workKey = book?.key.split("/").pop();

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-1 p-4">
        <CardTitle className="flex items-center justify-between">
          <span>{book?.title || "Unknown Title"}</span>
          <span className={`rounded p-2 text-white ${voteAverageColor}`}>
            {book?.ratings_average > 0 ? roundedRating : "N/A"}
          </span>
        </CardTitle>
        <CardDescription>
          {book?.first_publish_year || "Unknown Year"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div>
          {book?.author_name?.length > 0
            ? book.author_name[0]
            : "Unknown Author"}
        </div>
        <div>
          {book?.number_of_pages_median
            ? `${book.number_of_pages_median} pages`
            : "Unknown Page Count"}
        </div>
      </CardContent>
      <CardFooter className="block p-4">
        <Link href={`/books/${workKey}`} passHref>
          <Button
            className="mt-4 w-full rounded-lg px-4 py-2 transition-colors duration-150"
            aria-label={`View details about ${book?.title || "this book"}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
