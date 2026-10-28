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
  const chef = allChefs.find((c) => chefSlug(chefDisplayName(c, "full")) === slug);

  if (!chef) return notFound();

  // Find dishes containing this chef
  const chefDishes = dishes.filter((dish) =>
    dish.chef.includes(chef)
  );

  return (
    <div className="season-wrapper">
      {/* HEADER */}
      <div className="season-header">
        <h1>
          <span style={{ opacity: 0.3, marginRight: "0.4rem" }}>Dishes by</span>
          <span>{chef}</span>
        </h1>
        <p style={{ opacity: 0.6, marginTop: "0.25rem" }}>
          {chefDishes.length} dishes
        </p>
      </div>

      <div className="dish-grid" style={{ marginTop: "1.5rem" }}>
        {chefDishes.map((dish) => (
          <PhotoCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}