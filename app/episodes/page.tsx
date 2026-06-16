import Link from "next/link";
import dishes from "@/lib/dishes.json";

export default function EpisodesPage() {
  const episodesBySeason = dishes.reduce<Record<number, Set<number>>>(
    (acc, dish) => {
      if (!acc[dish.season]) {
        acc[dish.season] = new Set();
      }

      acc[dish.season].add(dish.episode);

      return acc;
    },
    {}
  );

  const seasons = Object.keys(episodesBySeason)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Episodes</h1>

      {seasons.map((season) => (
        <section key={season}>
          <h2>Season {season}</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            {[...episodesBySeason[season]]
              .sort((a, b) => a - b)
              .map((episode) => (
                <Link
                  key={`s${season}e${episode}`}
                  href={`/episodes/${episodeSlug(season, episode)}`}
                >
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
                    Episode {episode}
                  </button>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function episodeSlug(season: number, episode: number) {
  return `s${season}e${String(episode).padStart(2, "0")}`;
}