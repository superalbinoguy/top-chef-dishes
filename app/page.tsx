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

  return (
    
    <div className="">
      <main>
        <div>{seasons} season</div>
        <div>{episodes} episodes</div>
        <div>{chefs} chefs</div>
        <div>{totalDishes} dishes</div>
      </main>
    </div>
  );
}
