export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: PlatformDetail[];
}

export interface GameDetail extends Game {
  name_original: string;
  description: string;
  metacritic_platforms: MetacriticPlatform[];
  tba: boolean;
  updated: string;
  background_image_additional: string;
  website: string;
  rating_top: number;
  ratings: Record<string, any>;
  reactions: Record<string, any>;
  added: number;
  added_by_status: Record<string, any>;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: EsrbRating;
}

interface MetacriticPlatform {
  metascore: number;
  url: string;
}

interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

interface PlatformDetail {
  platform: Platform;
  released_at: string;
  requirements: Requirements;
}

interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface Requirements {
  minimum: string;
  recommended: string;
}

interface VideoGameListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getVideoGamesList(
  search: string,
  page: number,
): Promise<Game[]> {
  try {
    const url = `${BASE_URL}/api/video-games?search=${search}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch games list");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
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
    const url = `${BASE_URL}/api/video-games?id=${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for game ID: ${id}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}
