"use client";

type SeasonFilterProps = {
  seasons: number[];
  value: number | null;
  onChange: (season: number | null) => void;
};

export default function SeasonFilter({
  seasons,
  value,
  onChange,
}: SeasonFilterProps) {
  return (
    <div className="season-filter">
      <select
        id="season-select"
        value={value ?? ""}
        onChange={(e) =>
          onChange(
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