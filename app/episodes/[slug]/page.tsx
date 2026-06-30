import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";
import PhotoCard from "@/components/PhotoCard";

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

  const quickfireDishes = episodeDishes.filter(
    (episodeDish) => episodeDish.competition == "Quickfire"
  );

  const eliminationDishes = episodeDishes.filter(
    (episodeDish) => episodeDish.competition == "Elimination"
  );

  if (episodeDishes.length === 0) {
    return notFound();
  }

  const { season, episode } = episodeDishes[0];

  return (
    <div className="season-wrapper">
      {/* HEADER */}
      <div className="season-header">
        <h1>
          Season {season}, Episode {episode}
        </h1>
      </div>

      {/* GRID */}
      <div className="competition-header">
        <h1>
          Quickfire
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem"
        }}
      >
        {quickfireDishes.map((dish) => (
          <PhotoCard key={dish.slug} dish={dish} />
        ))}
      </div>

      <div className="competition-header">
        <h1>
          Elimination
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem"
        }}
      >
        {eliminationDishes.map((dish) => (
          <PhotoCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}