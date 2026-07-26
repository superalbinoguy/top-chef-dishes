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
        "livermush",
        "yogurt",
        "creme fraiche",
        "sweetened condensed milk",
        "marshmallow",
        "dulce de leche",
        "crema",
        "rabbit",
        "duck",
        "caviar",
        "roe",
        "fish sauce",
        "foie gras",
        "labneh",
        "ants"
      ];

      return !dish.ingredients.some((ingredient) =>
        banned.includes(ingredient.toLowerCase())
      );
    },
  },

  {
    id: "rare-ingredient",
    label: "Rare Ingredient",
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
    id: "never-repeated-dish",
    label: "Never Repeated Dish",
    description: "Dish types that have only been done once",
    test: (dish) => {
      const dishTypeCounts = dishes
        .flatMap((d) => d.dishes)
        .reduce<Record<string, number>>((acc, dishType) => {
          acc[dishType] = (acc[dishType] ?? 0) + 1;
          return acc;
        }, {});

      return dish.dishes.some(
        (dishType) => dishTypeCounts[dishType] === 1
      );
    },
  },

  {
    id: "finale",
    label: "Finale Dishes",
    test: (dish) =>
      dish.competition.toLowerCase().includes("finale"),
  },

  {
    id: "dessert",
    label: "Desserts",
    description: "Dishes that are or have desserts",
    test: (dish) =>
      dish.miscellaneous.includes("dessert"),
  },

  {
    id: "winning",
    label: "Winning Dishes",
    description: "Dishes have won an episode",
    test: (dish) =>
      dish.miscellaneous.includes("winning"),
  },

  {
    id: "losing",
    label: "Losing Dishes",
    description: "Dishes have lost an episode",
    test: (dish) =>
      dish.miscellaneous.includes("losing"),
  },
];