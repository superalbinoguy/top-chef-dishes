import dishes from "@/lib/dishes.json";

export function getSortedTagCounts(
  key: "cuisines" | "dishes" | "ingredients" | "techniques",
  season: number | null,
  source = dishes
) {
  return Object.entries(
    source
      .filter(
        (dish) =>
          season === null ||
          dish.season === season
      )
      .flatMap((d) => d[key])
      .reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
        return acc;
      }, {})
  ).sort(([, a], [, b]) => b - a);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function chefSlug(name: string) {
  return slugify(name);
}

export function tagSlug(tag: string) {
  return slugify(tag);
}

export function chefDisplayName(fullName: string, mode: "full" | "first") {
  if (mode === "full") return fullName;

  return fullName.split(" ")[0];
}