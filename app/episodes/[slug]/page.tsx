import dishes from "@/lib/dishes.json";
import Link from "next/link";
import { notFound } from "next/navigation";

function episodeSlug(season: number, episode: number) {
  return `s${season}e${String(episode).padStart(2, "0")}`;
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const episodeDishes = dishes.filter(
    (dish) => episodeSlug(dish.season, dish.episode) === slug
  );

  if (episodeDishes.length === 0) {
    return notFound();
  }

  const { season, episode } = episodeDishes[0];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        Season {season}, Episode {episode}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginTop: "1.5rem",
        }}
      >
        {episodeDishes.map((dish) => (
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