"use client";

import dishes from "@/lib/dishes.json";
import { useSeason } from "@/components/SeasonContext";

export default function SeasonFilter() {
  const { selectedSeason, setSelectedSeason } = useSeason();

  const seasons = [...new Set(dishes.map((d) => d.season))]
    .sort((a, b) => b - a);

  return (
    <div className="season-filter">
      <select
        value={selectedSeason ?? ""}
        onChange={(e) =>
          setSelectedSeason(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
      >
        <option value="">All Seasons</option>

        {seasons.map((season) => (
          <option key={season} value={season}>
            Season {season}
          </option>
        ))}
      </select>
    </div>
  );
}