import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import fs from "fs/promises";

const TMDB_KEY = process.env.TMDB_API_KEY;
const TV_ID = 41822; // Top Chef TMDB id

const seasons = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23
];

type Episode = {
  season: number;
  episode: number;
  title: string;
  overview: string;
  airDate: string | null;
};

async function fetchSeason(season: number) {
  const url =
    `https://api.themoviedb.org/3/tv/${TV_ID}/season/${season}?api_key=${TMDB_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.text();
    console.log("TMDB ERROR:", response.status, error);
    throw new Error(`Failed season ${season}`);
  }

  const data = await response.json();

  return data.episodes.map((episode: any): Episode => ({
    season,
    episode: episode.episode_number,
    title: episode.name,
    overview: episode.overview,
    airDate: episode.air_date,
  }));
}


async function main() {
  const episodes: Episode[] = [];

  for (const season of seasons) {
    console.log(`Fetching season ${season}`);

    const seasonEpisodes = await fetchSeason(season);

    episodes.push(...seasonEpisodes);
  }

  await fs.writeFile(
    "lib/episodes.json",
    JSON.stringify(episodes, null, 2)
  );

  console.log("Done!");
}

main();