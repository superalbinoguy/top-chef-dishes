import Link from "next/link";
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
      <div className="page-header">
        <h1 style={{margin: "auto",}}>The Dishes</h1>
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