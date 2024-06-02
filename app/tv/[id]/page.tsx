import React from "react";

import TVDetails from "@/components/tv/tv-details";

const TVDetailsPage = ({ params }: { params: { id: string } }) => {
  return <TVDetails seriesId={params.id} />;
};

export default TVDetailsPage;
