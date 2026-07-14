import dishes from "@/lib/dishes.json";

export function getSortedTagCounts(
  key: "cuisines" | "dishes" | "ingredients" | "techniques"
) {
  return Object.entries(
    dishes
      .flatMap((d) => d[key])
      .reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
        return acc;
      }, {})
  ).sort(([, a], [, b]) => b - a);
}

export function chefSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}