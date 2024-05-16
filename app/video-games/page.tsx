import VideoGames from "@/components/video-games/video-games";
import { getVideoGamesList } from "@/lib/rawg-api";

const VideoGamesPage = async (search: string, page: number) => {
  const videoGameList = await getVideoGamesList(search, page);

  return <VideoGames videoGameList={videoGameList} />;
};

export default VideoGamesPage;
