import React from "react";

import TV from "@/components/tv/tv";
import { getDiscoverTV, getTVList } from "@/lib/tmdb-api";

const TVPage = async ({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) => {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);

  const tvList = search
    ? await getTVList(search, page)
    : await getDiscoverTV(page);

  return <TV initialTV={tvList} initialSearch={search} initialPage={page} />;
};

export default TVPage;
