"use client";

import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import BookCard from "@/components/books/book-card";
import { SkeletonCard } from "@/components/skeleton-card";
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
import { getBookList } from "@/lib/open-library-api";
import type { Book } from "@/types/books";

interface BookSearchProps {
  initialBooks: Book[];
  initialSearch: string;
  initialPage: number;
  error?: string | null;
}

const Books = ({
  initialBooks,
  initialSearch,
  initialPage,
  error,
}: BookSearchProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [books, setBooks] = useState(initialBooks);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const fetchedBooks = await getBookList(search, limit, offset);
      setBooks((prevBooks) =>
        page === 1 ? fetchedBooks : [...prevBooks, ...fetchedBooks],
      );
      setHasMore(fetchedBooks.length === limit);
    } catch (err) {
      console.error("Error fetching books:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchBooks().catch((err) => console.error("Failed to load books:", err));
  }, [fetchBooks]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      fetchBooks().catch((err) =>
        console.error("Failed to load more books:", err),
      );
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPage(1);
    setBooks([]);
    debouncedSearch(value);
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <div className="my-4">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="flex-1 p-4">
            <CardTitle className="mb-4 text-center text-3xl font-bold">
              Welcome to Book Search
            </CardTitle>
            <CardDescription className="mb-4 text-center text-lg">
              Explore a vast collection of books.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-4 flex-1 p-4">
            <div className="mb-4 text-center text-lg">
              Use the input field below to search for books by title.
            </div>
            <div className="mb-4 text-center text-lg">
              Can&apos;t find what you&apos;re looking for?
            </div>
            <div className="mb-4 text-center text-lg">
              Click the <strong>&quot;Load More&quot;</strong> button to
              discover more books.
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Input
              type="text"
              placeholder="Search for a book..."
              onChange={handleSearchChange}
              className="mb-4 w-full rounded-lg bg-background"
            />
          </CardFooter>
        </Card>
      </div>

      {loading && page === 1 && (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="mr-2 size-16 animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.length > 0 &&
          books.map((book) => <BookCard key={uuidv4()} book={book} />)}
        {loading &&
          page > 1 &&
          Array.from({ length: 10 }).map(() => <SkeletonCard key={uuidv4()} />)}
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {!books.length && !loading && !error && (
        <p className="text-center">
          No books found. Try adjusting your search.
        </p>
      )}

      {hasMore && !loading && (
        <Button className="mt-4 block w-full" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default Books;
