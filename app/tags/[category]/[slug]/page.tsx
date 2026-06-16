import dishes from "@/lib/dishes.json";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function TagPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  console.log({
    category,
    slug,
  });

  // 1. Validate category
  if (!validCategories.includes(category as Category)) {
    console.log("1:", validCategories, category)
    return notFound();
  }

  const typedCategory = category as Category;

  // 2. Build all tags for this category
  const allTags = [
    ...new Set(dishes.flatMap((d) => d[typedCategory])),
  ];

  // 3. Resolve slug → actual tag name
  const tag = allTags.find((t) => tagSlug(t) === slug);

  console.log(tag)
  if (!tag) return notFound();

  // 4. Filter dishes
  const matchingDishes = dishes.filter((dish) =>
    dish[typedCategory].includes(tag)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{tag}</h1>

      <p style={{ opacity: 0.7 }}>
        {matchingDishes.length} dishes
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginTop: "1.5rem",
        }}
      >
        {matchingDishes.map((dish) => (
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
                color: "black",
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