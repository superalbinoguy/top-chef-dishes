"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-center gap-2 text-3xl font-semibold">
        <span>The</span>
        <Image
          src="/images/logos/Episodes.png"
          alt="Episodes"
          width={800}
          height={100}
          className="h-18 w-auto"
          priority
        />
      </div>

      <div className="season-wrapper">
        {seasons.map((season) => (
          <section key={season} style={{ marginBottom: "2.5rem" }}>
            <div className="season-header">
              <h2 style={{ marginBottom: "1rem" }}>Season {season}</h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "12px",
              }}
            >
              {[...episodesBySeason[season]]
                .sort((a, b) => a - b)
                .map((episode) => (
                  <Link
                    key={`s${season}e${episode}`}
                    href={`/episodes/${episodeSlug(season, episode)}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        border: "2px solid black",
                        borderRadius: "12px",
                        padding: "14px",
                        background: "white",
                        boxShadow: "4px 4px 0 black",
                        cursor: "pointer",
                        transition: "transform 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "70px",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "black",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform =
                          "translateY(-2px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0px)")
                      }
                    >
                      Episode {episode}
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function episodeSlug(season: number, episode: number) {
  return `s${season}e${String(episode).padStart(2, "0")}`;
}