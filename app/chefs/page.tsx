import Link from "next/link";
import Image from "next/image"
import dishes from "@/lib/dishes.json";
import ChefCard from "@/components/ChefCard";

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
    <div>
      <div className="flex items-center justify-center gap-2 text-3xl font-semibold">
          <span>The</span>
          <Image
            src="/images/logos/Chefs.png"
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
          <div style={{        
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}>
            {Array.from(chefsBySeason[season])
              .sort()
              .map((chef) => (
                <ChefCard
                        key={chefSlug(chef)}
                        chef={chef}
                      />
              ))}
          </div>
        </section>
      ))}
      </div>
    </div>
  );
}

function chefSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}