"use client";

import Link from "next/link";
import Image from "next/image";
import dishes from "@/lib/dishes.json";
import episodes from "@/lib/episodes.json";

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

  // Create quick lookup for titles
  const episodeLookup = new Map(
    episodes.map((episode) => [
      `${episode.season}-${episode.episode}`,
      episode,
    ])
  );

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
              <h2 style={{ marginBottom: "1rem" }}>
                Season {season}
              </h2>
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
                .map((episode) => {
                  const episodeData = episodeLookup.get(
                    `${season}-${episode}`
                  );

                  return (
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
                          minHeight: "90px",
                          color: "black",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform =
                            "translateY(-2px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform =
                            "translateY(0px)")
                        }
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "1rem",
                          }}
                        >
                          Episode {episode}
                        </div>

                        <div
                          style={{
                            marginTop: "4px",
                            fontSize: "0.85rem",
                            color: "#666",
                            fontStyle: "italic",
                          }}
                        >
                          {episodeData?.title ?? "Untitled Episode"}
                        </div>
                      </div>
                    </Link>
                  );
                })}
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