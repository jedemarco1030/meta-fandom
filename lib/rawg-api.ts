const RAWG_API = 'https://api.rawg.io/api/';

interface APIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: PlatformDetail[];
}

interface GameDetail extends Game {
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

export async function getVideoGamesList(
  search: string,
  page: number,
): Promise<Game[]> {
  try {
    const url = `${RAWG_API}games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${search}&page_size=10&page=${page}`;
    const response = await fetch(url);
    const data: APIResponse<Game> = await response.json();
    if (!response.ok) throw new Error('Failed to fetch games list');
    return data.results;
  } catch (error) {
    console.error('Error fetching games list:', error);
    return [];
  }
}

export async function getVideoGameDetails(
  id: string,
): Promise<GameDetail | null> {
  try {
    const url = `${RAWG_API}games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;
    const response = await fetch(url);
    const data: GameDetail = await response.json();
    if (!response.ok)
      throw new Error(`Failed to fetch details for game ID: ${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
}
