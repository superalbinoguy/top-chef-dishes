"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

type SearchResult =
  | { type: "dish"; label: string; href: string }
  | { type: "chef"; label: string; href: string }
  | { type: "cuisine"; label: string; href: string }
  | { type: "ingredient"; label: string; href: string }
  | { type: "technique"; label: string; href: string };

const typeLabels: Record<SearchResult["type"], string> = {
  dish: "Dishes",
  chef: "Chefs",
  cuisine: "Cuisines",
  ingredient: "Ingredients",
  technique: "Techniques",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildIndex(dishes: Dish[]): SearchResult[] {
  const chefs = new Set<string>();
  const cuisines = new Set<string>();
  const ingredients = new Set<string>();
  const techniques = new Set<string>();

  const results: SearchResult[] = [];

  for (const d of dishes) {
    results.push({
      type: "dish",
      label: d.name,
      href: `/dishes/${d.slug}`,
    });

    if (d.chef && !chefs.has(d.chef)) {
      chefs.add(d.chef);
      results.push({
        type: "chef",
        label: d.chef,
        href: `/chefs/${slugify(d.chef)}`,
      });
    }

    for (const c of d.cuisines ?? []) {
      if (!cuisines.has(c)) {
        cuisines.add(c);
        results.push({
          type: "cuisine",
          label: c,
          href: `/tags/cuisines/${slugify(c)}`,
        });
      }
    }

    for (const i of d.ingredients ?? []) {
      if (!ingredients.has(i)) {
        ingredients.add(i);
        results.push({
          type: "ingredient",
          label: i,
          href: `/tags/ingredients/${slugify(i)}`,
        });
      }
    }

    for (const t of d.techniques ?? []) {
      if (!techniques.has(t)) {
        techniques.add(t);
        results.push({
          type: "technique",
          label: t,
          href: `/techniques/${slugify(t)}`,
        });
      }
    }
  }

  return results;
}

export default function SearchAndNav({ dishes }: { dishes: Dish[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const index = useMemo(() => buildIndex(dishes), [dishes]);

  const filtered = useMemo(() => {
    if (!search.trim()) return [];

    const q = search.toLowerCase();

    return index.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
  }, [search, index]);

  const grouped = useMemo(() => {
    const groups: Record<SearchResult["type"], SearchResult[]> = {
      dish: [],
      chef: [],
      cuisine: [],
      ingredient: [],
      technique: [],
    };

    for (const item of filtered) {
      groups[item.type].push(item);
    }

    return groups;
  }, [filtered]);

  // Click-outside handler (replaces blur + timeout)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef}>
      {/* SEARCH */}
      <div className="searchbar border-b p-4 space-y-3 relative">
        <input
          className="border p-2 w-full"
          placeholder="Search dishes, chefs, ingredients..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />

        {/* DROPDOWN */}
        {search && open && filtered.length > 0 && (
          <div
            className="absolute z-50 left-0 right-0 bg-[#fffdf6] border-2 border-black shadow-lg mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {Object.entries(grouped)
              .filter(([_, items]) => items.length > 0)
              .map(([type, items]) => (
                <div key={type} className="p-2">
                  <div className="text-xs uppercase opacity-60 mb-1">
                    {typeLabels[type as SearchResult["type"]]}
                  </div>

                  {items.slice(0, 6).map((item) => (
                    <button
                      key={`${item.type}-${item.href}`}
                      onClick={() => {
                        router.push(item.href);
                        setSearch("");
                        setOpen(false);
                      }}
                      className="block w-full text-left p-2 hover:bg-black hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* TABS */}
      <div>
        <div className="tabs flex gap-2 flex-wrap">
          {routes.map((r) => {
            const isActive =
              r.path === "/"
                ? pathname === "/"
                : pathname.startsWith(r.path);

            return (
              <button
                key={r.path}
                onClick={() => router.push(r.path)}
                className={`card-tab ${isActive ? "active" : ""}`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}