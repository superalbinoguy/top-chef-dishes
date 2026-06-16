"use client";

import Link from "next/link";
import CountryFlag from "react-country-flag";
import { getSortedTagCounts } from "@/lib/tag-utils";
import { Globe, Utensils } from "lucide-react";

const cuisineFlags: Record<string, string> = {
  French: "FR",
  Italian: "IT",
  Japanese: "JP",
  Chinese: "CN",
  Korean: "KR",
  Spanish: "ES",
  Mexican: "MX",
  Indian: "IN",
  Thai: "TH",
  Southern: "US",
  Vietnamese: "VN",
  British: "GB",
  Brazilian: "BR",
  Croatian: "CR",
  Turkish: "TR",
  German: "DE",
  Salvadoran: "SV",
  Haitian: "HT",
  Ghanaian: "GH",
  Venezuelan: "VE",
  Moroccan: "MR",
  Nigerian: "NG",
  Filipino: "PH",
  Cuban: "CU",
  "Puerto Rican": "PR",
  Peruvian: "PE"
};

const globeColors: Record<string, string> = {
  "Latin American": "red",   // green
  "West African": "purple",     // purple
  "Middle Eastern": "gold",   // orange/gold
  "Creole": "green",
  "Caribbean": "teal"
};

function tagSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getFlag(tag: string, category: string) {
  if (category !== "cuisines") return null;
  return cuisineFlags[tag] ?? null;
}

export function resolveCuisineIcon(tag: string) {
  if (cuisineFlags[tag]) {
    return {
      type: "flag" as const,
      value: cuisineFlags[tag],
    };
  }

  if (globeColors[tag]) {
    return {
      type: "globe" as const,
      color: globeColors[tag],
    };
  }

  return { type: "generic" as const };
}

export default function TagsPage() {
  const groups = [
    { title: "Cuisines", category: "cuisines", data: getSortedTagCounts("cuisines") },
    { title: "Dish Types", category: "dishes", data: getSortedTagCounts("dishes") },
    { title: "Ingredients", category: "ingredients", data: getSortedTagCounts("ingredients") },
    { title: "Techniques", category: "techniques", data: getSortedTagCounts("techniques") },
  ] as const;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Tags</h1>

      {groups.map((group) => (
        <section key={group.category} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>{group.title}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "12px",
            }}
          >
            {group.data.map(([tag, count]) => {
              const code = getFlag(tag, group.category);
              const icon = group.category === "cuisines"
                ? resolveCuisineIcon(tag)
                : { type: "generic" as const };
              return (
                <Link
                  key={`${group.category}-${tag}`}
                  href={`/tags/${group.category}/${tagSlug(tag)}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      border: "2px solid black",
                      borderRadius: "12px",
                      padding: "12px",
                      background: "white",
                      boxShadow: "4px 4px 0 black",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      height: "100%",
                      transition: "transform 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0px)")
                    }
                  >
                    {/* icon row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          border: "1px solid #ddd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f5f5f5",
                          overflow: "hidden",
                        }}
                      >
                        {icon.type === "flag" && (
                          <CountryFlag
                            countryCode={icon.value}
                            svg
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )}

                        {icon.type === "globe" && (
                          <Globe
                            size={18}
                            strokeWidth={2}
                            style={{
                              color: icon.color,
                            }}
                          />
                        )}

                        {icon.type === "generic" && (
                          <Utensils size={18} strokeWidth={2} opacity={0.6} />
                        )}
                      </div>

                      <div style={{ fontWeight: 600 }}>{tag}</div>
                    </div>

                    {/* count */}
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                      {count} entries
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}