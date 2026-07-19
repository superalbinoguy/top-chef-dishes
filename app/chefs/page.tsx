"use client";

import Image from "next/image"
import dishes from "@/lib/dishes.json";
import ChefCard from "@/components/ChefCard";
import { chefSlug } from "@/lib/tag-utils";
import SeasonFilter from "@/components/SeasonFilter";
import { useState } from "react";

export default function ChefsPage() {
  const chefsBySeason = dishes.reduce<Record<number, Set<string>>>(
    (acc, dish) => {
      if (dish.chef.includes("Team")) return acc;

      if (!acc[dish.season]) {
        acc[dish.season] = new Set();
      }

      dish.chef.forEach((chef) => {
        acc[dish.season].add(chef);
      })

      return acc;
    },
    {}
  );

  const seasons = Object.keys(chefsBySeason)
    .map(Number)
    .sort((a, b) => b - a);

  const [selectedSeason, setSelectedSeason] =
      useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-3xl font-semibold">
      </div>
      <div className="relative flex items-center justify-center text-3xl font-semibold mb-4">
              <span>The</span>
              <Image
                src="/images/logos/Chefs.png"
                alt="Dishes"
                width={800}
                height={100}
                className="h-18 w-auto"
                priority
              />
      
              <div className="absolute right-0">
                <SeasonFilter
                  seasons={seasons}
                  value={selectedSeason}
                  onChange={setSelectedSeason}
                />
              </div>
            </div>
      <div className="season-wrapper">
        {(selectedSeason ? [selectedSeason] : seasons).map((season) => (
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