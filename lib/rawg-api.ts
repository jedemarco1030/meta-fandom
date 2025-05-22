import type {
  Game,
  GameDetail,
  VideoGameListResponse,
} from "@/types/video-games";

const getBaseUrl = () =>
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL;

export async function getVideoGamesList(
  search: string,
  page: number,
): Promise<Game[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/video-games?search=${search}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch games list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data: VideoGameListResponse = await response.json();
      return data.results || [];
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching games list:", error);
    return [];
  }
}

export async function getVideoGameDetails(
  id: string,
): Promise<GameDetail | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/video-games?id=${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for game ID: ${id}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}
