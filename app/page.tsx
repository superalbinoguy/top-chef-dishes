import dishes from "@/lib/dishes.json";

export default function Home() {
  const seasons = new Set(dishes.map((d) => d.season)).size;

  const episodes = new Set(
    dishes.map((d) => `${d.season}-${d.episode}`)
  ).size;

  const chefs = new Set(
    dishes
      .map((d) => d.chef)
      .filter((chef) => chef !== "Team")
  ).size;

  const totalDishes = dishes.length;

  const stats = [
    {
      value: seasons,
      logo: "/images/logos/StatsSeasons.png",
      alt: "Seasons",
      className: "h-10",
    },
    {
      value: episodes,
      logo: "/images/logos/StatsEpisodes.png",
      alt: "Episodes",
      className: "h-16",
    },
    {
      value: chefs,
      logo: "/images/logos/StatsChefs.png",
      alt: "Chefs",
      className: "h-17",
    },
    {
      value: totalDishes,
      logo: "/images/logos/StatsDishes.png",
      alt: "Dishes",
      className: "h-16",
    },
  ];

  return (
    <main className="flex flex-col items-center gap-6 py-12">
      {stats.map((stat) => (
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
      ))}
    </main>
  );
}