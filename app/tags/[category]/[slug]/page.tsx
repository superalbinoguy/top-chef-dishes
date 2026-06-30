import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";
import PhotoCard from "@/components/PhotoCard";
import { Italic } from "lucide-react";

const validCategories = [
  "cuisines",
  "dishes",
  "ingredients",
  "techniques",
] as const;

type Category = (typeof validCategories)[number];

function tagSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTagTitle(category: string) {
  switch (category) {
    case "cuisines":
      return `Dishes that are`;
    case "ingredients":
      return `Dishes with`;
    case "techniques":
      return `Dishes that have been`;
    case "dishes":
      return `Dishes that have`;
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // 1. Validate category
  if (!validCategories.includes(category as Category)) {
    return notFound();
  }

  const typedCategory = category as Category;

  // 2. Build all tags for this category
  const allTags = [...new Set(dishes.flatMap((d) => d[typedCategory]))];

  // 3. Resolve slug → actual tag name
  const tag = allTags.find((t) => tagSlug(t) === slug);

  if (!tag) return notFound();

  // 4. Filter dishes
  const matchingDishes = dishes.filter((dish) =>
    dish[typedCategory].includes(tag)
  );

  return (
    <div className="season-wrapper">
      {/* HEADER */}
      <div className="season-header">
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
          <h1 style={{ opacity: 0.3, marginRight: "4px",}}>{getTagTitle(typedCategory)}</h1>
          <h1>{tag}</h1>
        </div>
        <p style={{ opacity: 0.6, marginTop: "0.25rem" }}>
          {matchingDishes.length} dishes
        </p>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >
        {matchingDishes.map((dish) => (
          <PhotoCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}