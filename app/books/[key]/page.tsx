import React from "react";

import BookDetails from "@/components/books/book-details";

const BookDetailsPage = ({ params }: { params: { key: string } }) => {
  return <BookDetails workKey={params.key} />;
};

export default BookDetailsPage;
