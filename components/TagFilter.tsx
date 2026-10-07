"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DishFilter } from "@/lib/filter-utils";

type Props = {
  filters: DishFilter[];
  selected: string[];
  onChange: (ids: string[]) => void;
};

export default function TagFilter({
  filters,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(
    null
  );

  // Anchored to the whole chip (border + padding included), not just
  // the inner <button>, so the panel lines up flush with the visible
  // box edge instead of sitting offset by the chip's own padding.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Portals need a real DOM node to render into, which only exists
  // client-side. This starts false during SSR/first render and flips
  // true right after mount, so we never call document.body before
  // it's available.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Click-outside now has to check both the chip (still in its
  // original spot) and the panel (portaled elsewhere in the DOM),
  // since they're no longer nested inside a common container.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Since the panel renders via a portal, it's no longer positioned
  // relative to the chip in the DOM — we compute its screen position
  // manually from the chip's actual location instead.
  useLayoutEffect(() => {
    if (!open || !containerRef.current) return;

    const updatePosition = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  function toggleFilter(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  const buttonLabel =
    selected.length === 0
      ? "All Filters"
      : selected.length === 1
      ? filters.find((f) => f.id === selected[0])?.label ?? "1 Filter"
      : `${selected.length} Filters`;

  const panel = open && coords && (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: coords.top,
        right: coords.right,
        background: "white",
        border: "2px solid black",
        borderRadius: "12px",
        boxShadow: "4px 4px 0 black",
        padding: "0.75rem",
        minWidth: "200px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          style={{
            alignSelf: "flex-start",
            fontSize: "0.75rem",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            opacity: 0.7,
          }}
        >
          Clear all
        </button>
      )}

      {filters.map((filter) => (
        <label
          key={filter.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(filter.id)}
            onChange={() => toggleFilter(filter.id)}
            style={{
              accentColor: "black",
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />
          {filter.label}
        </label>
      ))}
    </div>
  );

  return (
    <div className="tag-filter" ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "transparent",
          border: "none",
          font: "inherit",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        {buttonLabel}
        <span style={{ fontSize: "0.7em" }}>▾</span>
      </button>

      {/* Rendered into document.body instead of in place, so it can't
          get trapped under an ancestor's stacking context (the same
          issue we hit with .card-tab.active vs. the zoom overlay). */}
      {mounted && panel && createPortal(panel, document.body)}
    </div>
  );
}