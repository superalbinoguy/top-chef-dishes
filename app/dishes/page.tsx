import Link from "next/link";
import Image from "next/image"
import dishes from "@/lib/dishes.json";
import PhotoCard from "@/components/PhotoCard";

const grouped = dishes.reduce<
  Record<number, Record<number, typeof dishes>>
>((acc, dish) => {
  if (!acc[dish.season]) {
    acc[dish.season] = {};
  }

  if (!acc[dish.season][dish.episode]) {
    acc[dish.season][dish.episode] = [];
  }

  acc[dish.season][dish.episode].push(dish);

  return acc;
}, {});

export default function DishHomepage() {
  const grouped = dishes.reduce<
    Record<number, Record<number, typeof dishes>>
  >((acc, dish) => {
    if (!acc[dish.season]) {
      acc[dish.season] = {};
    }

    if (!acc[dish.season][dish.episode]) {
      acc[dish.season][dish.episode] = [];
    }

    acc[dish.season][dish.episode].push(dish);

    return acc;
  }, {});

  const seasons = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-3xl font-semibold">
          <span>The</span>
          <Image
            src="/images/logos/Dishes.png"
            alt="Dishes"
            width={800}
            height={100}
            className="h-18 w-auto"
            priority
          />
      </div>
      <div className="season-wrapper">
        {seasons.map((season) => (
          <section key={season}>
            <div className="season-header">
              <h2>Season {season}</h2>
            </div>

            {Object.keys(grouped[season])
              .map(Number)
              .sort((a, b) => a - b)
              .map((episode) => (
                <div key={episode}>
                  <div className="episode-header">
                    <h3>Episode {episode}</h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "2rem",
                      marginBottom: "3rem",
                    }}
                  >
                    {grouped[season][episode].map((dish) => (
                      <PhotoCard
                        key={dish.slug}
                        dish={dish}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}