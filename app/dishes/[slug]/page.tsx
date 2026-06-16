import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";

function getImagePath(slug: string) {
  const season = slug.slice(0, 3);   // "S23"
  const episode = slug.slice(3, 6);   // "E01"
  const file = slug.slice(6);        // "QF05"

  return `/images/${season}/${episode}/${file}.webp`;
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = dishes.find((d) => d.slug === slug);

  if (!dish) return notFound();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{dish.name}</h1>

      <img
        src={getImagePath(dish.slug)}
        alt={dish.name}
        style={{ width: "100%", maxWidth: "600px", marginTop: "1rem" }}
      />

      <p style={{ marginTop: "1rem" }}>
        <strong>Season:</strong> {dish.season} <br />
        <strong>Episode:</strong> {dish.episode} <br />
        <strong>Competition:</strong> {dish.competition} <br /><br />
        <strong>Tags</strong> <br />
        <strong>Cuisines:</strong> {dish.cuisines.join(", ")} <br />
        <strong>Ingredients:</strong> {dish.ingredients.join(", ")} <br />
        <strong>Techniques:</strong> {dish.techniques.join(", ")} <br />
      </p>
    </div>
  );
}