"use client";

import { createContext, useContext, useState } from "react";

type SeasonContextType = {
  selectedSeason: number | null;
  setSelectedSeason: (season: number | null) => void;
};

const SeasonContext = createContext<SeasonContextType | undefined>(
  undefined
);

export function SeasonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSeason, setSelectedSeason] =
    useState<number | null>(null);

  return (
    <SeasonContext.Provider
      value={{ selectedSeason, setSelectedSeason }}
    >
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const context = useContext(SeasonContext);

  if (!context) {
    throw new Error(
      "useSeason must be used inside SeasonProvider"
    );
  }

  return context;
}