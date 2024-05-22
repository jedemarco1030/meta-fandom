import React from "react";

import VideoGames from "@/components/video-games/video-games";
import { getVideoGamesList } from "@/lib/rawg-api";

const VideoGamesPage = async ({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) => {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);

  const videoGameList = await getVideoGamesList(search, page);

  return (
    <VideoGames
      initialGames={videoGameList}
      initialSearch={search}
      initialPage={page}
    />
  );
};

export default VideoGamesPage;
