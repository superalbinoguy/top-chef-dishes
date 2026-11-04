import dishes from "@/lib/dishes.json";

// Set to false if "next season" should mean the newer one (S22 -> S23).
const NEXT_SEASON_IS_OLDER = true;

const COMPETITION_ORDER: Record<string, number> = {
  Quickfire: 0,
  Elimination: 1,
};

// Array.sort is stable, so dishes keep their JSON order within a challenge.
const orderedDishes = [...dishes].sort((a, b) => {
  if (a.season !== b.season) {
    return NEXT_SEASON_IS_OLDER ? b.season - a.season : a.season - b.season;
  }
  if (a.episode !== b.episode) return a.episode - b.episode;
  return (
    (COMPETITION_ORDER[a.competition] ?? 2) -
    (COMPETITION_ORDER[b.competition] ?? 2)
  );
});

export function getAdjacentDishes(slug: string) {
  const i = orderedDishes.findIndex((d) => d.slug === slug);
  if (i === -1) return { prev: null, next: null };

  return {
    prev: orderedDishes[i - 1] ?? null,
    next: orderedDishes[i + 1] ?? null,
  };
}