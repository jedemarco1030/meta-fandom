"use client";

import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookDetails } from "@/lib/open-library-api";
import type { Book } from "@/types/books";

const BookDetails = ({ workKey }: { workKey: string }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchBook() {
      try {
        const data = await getBookDetails(workKey);
        if (data && isMounted) {
          setBook({
            ...data,
            description: DOMPurify.sanitize(data.description || ""),
          });
        } else if (isMounted) {
          setError("Failed to load book data.");
        }
      } catch (err) {
        console.error("Failed to fetch book details:", err);
        if (isMounted) setError("Failed to load book data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBook()
      .then(() => {
        console.log("Book fetched successfully");
      })
      .catch((err) => {
        console.error("Error in fetching book:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [workKey]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 size-16 animate-spin" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="flex-1 p-4">
          <CardTitle className="text-center text-3xl font-bold">
            {book?.title}
          </CardTitle>
          <CardDescription className="grid gap-4">
            {book?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 p-4">
          {book?.covers && (
            <Image
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}.jpg`}
              alt={`${book?.title} cover image`}
              height={300}
              width={300}
              className="m-auto rounded"
              priority={false}
            />
          )}
        </CardContent>
        <CardFooter className="flex-1 flex-col items-start p-4">
          <div className="mb-4 w-full">
            <h3 className="text-xl font-bold">Subject Places</h3>
            {book?.subject_places && book.subject_places.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {book.subject_places.map((subject_place) => (
                  <Badge key={subject_place} className="inline-block">
                    {subject_place}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="mb-4 flex flex-wrap gap-2">N/A</div>
            )}
            <h3 className="text-xl font-bold">Subjects</h3>
            {book?.subject && book.subject.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {book.subject.map((subject) => (
                  <Badge key={subject} className="inline-block">
                    {subject}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="mb-4 flex flex-wrap gap-2">N/A</div>
            )}
            <h3 className="text-xl font-bold">Subject People</h3>
            {book?.subject_people && book.subject_people.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {book.subject_people.map((subject_person) => (
                  <Badge key={subject_person} className="inline-block">
                    {subject_person}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="mb-4 flex flex-wrap gap-2">N/A</div>
            )}
            <h3 className="text-xl font-bold">Subject Times</h3>
            {book?.subject_times && book.subject_times.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {book.subject_times.map((subject_time) => (
                  <Badge key={subject_time} className="inline-block">
                    {subject_time}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="mb-4 flex flex-wrap gap-2">N/A</div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookDetails;
