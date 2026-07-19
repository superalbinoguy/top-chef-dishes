import dishes from "@/lib/dishes.json";

export type DishFilter = {
  id: string;
  label: string;
  description?: string;

  // determines whether a dish matches
  test: (dish: typeof dishes[number]) => boolean;
};

export const dishFilters: DishFilter[] = [
  {
    id: "vegan",
    label: "Vegan",
    description: "Dishes containing no animal products",
    test: (dish) => {
      const banned = [
        "beef",
        "pork",
        "chicken",
        "fish",
        "shellfish",
        "egg",
        "milk",
        "cheese",
        "butter",
        "cream",
        "lamb",
        "sour cream",
        "livermush"
      ];

      return !dish.ingredients.some((ingredient) =>
        banned.includes(ingredient.toLowerCase())
      );
    },
  },

  {
    id: "never-repeated",
    label: "Never Repeated Ingredient",
    description: "Ingredients appearing in only one dish",
    test: (dish) => {
      const ingredientCounts = dishes
        .flatMap((d) => d.ingredients)
        .reduce<Record<string, number>>((acc, ingredient) => {
          acc[ingredient] = (acc[ingredient] ?? 0) + 1;
          return acc;
        }, {});

      return dish.ingredients.some(
        (ingredient) => ingredientCounts[ingredient] === 1
      );
    },
  },

  {
    id: "finale",
    label: "Finale Dishes",
    test: (dish) =>
      dish.competition.toLowerCase().includes("finale"),
  },
];