import dishes from "@/lib/dishes.json";

export default function Home() {
  const seasons = new Set(dishes.map((d) => d.season)).size;

  const episodes = new Set(
    dishes.map((d) => `${d.season}-${d.episode}`)
  ).size;

  const chefs = new Set(
    dishes.flatMap((dish) => dish.chef)
  ).size;

  const totalDishes = dishes.length;

  const stats = [
    {
      value: seasons,
      logo: "/images/logos/StatsSeasons.png",
      alt: "Seasons",
      className: "h-10",
      preamble: "In this encyclopedic compendium of Top Chef, there are..."
    },
    {
      value: episodes,
      logo: "/images/logos/StatsEpisodes.png",
      alt: "Episodes",
      className: "h-16",
      preamble: "spanning a whopping..."
    },
    {
      value: chefs,
      logo: "/images/logos/StatsChefs.png",
      alt: "Chefs",
      className: "h-17",
      preamble: "in which there competed..."
    },
    {
      value: totalDishes,
      logo: "/images/logos/StatsDishes.png",
      alt: "Dishes",
      className: "h-16",
      preamble: "and in this, we celebrate every one of their..."
    },
  ];

  return (
    <main className="flex flex-col items-center gap-6 py-12">
      {stats.map((stat) => (
        <div key={stat.value}>
          <div className="flex items-center justify-center gap-3 text-xl italic home-preamble" key={stat.preamble}>{stat.preamble}</div>
          <div
          key={stat.alt}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-5xl font-bold">{stat.value}</span>

          <div className="h-14 flex items-center">
            <img
              src={stat.logo}
              alt={stat.alt}
              className={`${stat.className} w-auto`}
            />
          </div>
        </div>
        </div>
      ))}
    </main>
  );
}