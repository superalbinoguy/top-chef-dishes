"use client"

import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export default function SearchAndNav({
  dishes,
}: {
  dishes: Dish[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");


  return (
    <div>
      <div className="searchbar border-b p-4 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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