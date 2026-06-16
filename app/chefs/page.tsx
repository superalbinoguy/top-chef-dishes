import Link from "next/link";
import dishes from "@/lib/dishes.json";

export default function ChefsPage() {
  const chefsBySeason = dishes.reduce<Record<number, Set<string>>>(
    (acc, dish) => {
      if (dish.chef === "Team") return acc;

      if (!acc[dish.season]) {
        acc[dish.season] = new Set();
      }

      acc[dish.season].add(dish.chef);

      return acc;
    },
    {}
  );

  const seasons = Object.keys(chefsBySeason)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chefs</h1>

      {seasons.map((season) => (
        <section key={season}>
          <h2>Season {season}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
            {[...chefsBySeason[season]]
              .sort()
              .map((chef) => (
                <Link key={chefSlug(chef)} href={`/chefs/${chefSlug(chef)}`}>
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
                      color: "black"
                    }}
                  >
                    {chef}
                  </button>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function chefSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}