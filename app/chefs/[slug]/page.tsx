import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";
import PhotoCard from "@/components/PhotoCard";
import { chefSlug, chefDisplayName } from "@/lib/tag-utils";

export default async function ChefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Build all chefs from dishes
  const allChefs = [
    ...new Set(dishes.flatMap((dish) => dish.chef)),
  ].filter((chef) => !chef.includes("Team"));

  // Resolve slug -> actual chef name
  const chef = allChefs.find((c) => chefSlug(chefDisplayName(c, "first")) === slug);

  if (!chef) return notFound();

  // Find dishes containing this chef
  const chefDishes = dishes.filter((dish) =>
    dish.chef.includes(chef)
  );

  return (
    <div className="season-wrapper">
      {/* HEADER */}
      <div className="season-header">
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
          <h1 style={{ opacity: 0.3, marginRight: "4px",}}>Dishes by</h1>
          <h1>{chef}</h1>
        </div>
        <p style={{ opacity: 0.6, marginTop: "0.25rem" }}>
          {chefDishes.length} dishes
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
        {chefDishes.map((dish) => (
          <PhotoCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}