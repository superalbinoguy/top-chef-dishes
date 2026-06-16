import dishes from "@/lib/dishes.json";
import Link from "next/link";
import { notFound } from "next/navigation";

function chefSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ChefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const chef = dishes
    .map((d) => d.chef)
    .filter((c) => c !== "Team")
    .find((c) => chefSlug(c) === slug);

  if (!chef) return notFound();

  const chefDishes = dishes.filter(
    (d) => d.chef === chef
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{chef}</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
        {dishes.map((dish) => (
          <Link key={dish.slug} href={`/dishes/${dish.slug}`}>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                fontSize: "1rem",
                color: "black"
              }}
            >
              {dish.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}