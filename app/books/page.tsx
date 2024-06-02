import React from "react";

import Books from "@/components/books/books";
import { getBookList } from "@/lib/open-library-api";

interface BooksPageProps {
  searchParams: { search?: string; page?: string };
}

const BooksPage = async ({ searchParams }: BooksPageProps) => {
  const search = searchParams.search || "abc";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;
  const sort = search ? "relevance" : "random";

  const initialBooks = await getBookList(search, limit, offset, sort);

  return (
    <Books
      initialBooks={initialBooks}
      initialSearch={search}
      initialPage={page}
    />
  );
};

export default BooksPage;
