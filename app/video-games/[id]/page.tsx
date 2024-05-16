import React from 'react';

import VideoGameDetails from '@/components/video-games/video-game-details';

const VideoGameDetailsPage = ({ params }: { params: { id: string } }) => {
  return <VideoGameDetails gameId={params.id} />;
};

export default VideoGameDetailsPage;
