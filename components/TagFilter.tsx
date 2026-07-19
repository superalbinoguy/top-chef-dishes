"use client";

import { DishFilter } from "@/lib/filter-utils";

type Props = {
  filters: DishFilter[];
  selected: string | null;
  onChange: (id: string | null) => void;
};

export default function TagFilter({
  filters,
  selected,
  onChange,
}: Props) {
  return (
    <div className="tag-filter">
      <select
        value={selected ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value === ""
              ? null
              : e.target.value
          )
        }
      >
        <option value="">
          All Filters
        </option>

        {filters.map((filter) => (
          <option key={filter.id} value={filter.id}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}