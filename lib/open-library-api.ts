import type { Book, BookSearchResponse } from "@/types/books";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getBookList(
  query: string,
  limit: number,
  offset: number,
  sort = "relevance",
): Promise<Book[]> {
  try {
    const url = `${BASE_URL}/api/books?query=${query}&limit=${limit}&offset=${offset}&sort=${sort}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch book list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: BookSearchResponse = await response.json();
      return data.docs || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching book list:", error);
    return [];
  }
}

export async function getBookDetails(workKey: string): Promise<Book | null> {
  try {
    const url = `${BASE_URL}/api/books?work_key=${workKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for book workKey: ${workKey}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}
