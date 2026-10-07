import Link from "next/link";
import { chefDisplayName } from "@/lib/tag-utils";

function getImagePath(slug: string) {
  return `/images/${slug.slice(0, 3)}/${slug.slice(3, 6)}/${slug.slice(6)}`;
}

function tryImage(slug: string): string {
  const basePath = getImagePath(slug);

  return `${basePath}x.webp`;
}

const stampImages: Record<string, string> = {
  won: "/images/logos/winner.png",
  lost: "/images/logos/loser.png",
  top: "/images/logos/top.png",
  bottom: "/images/logos/bottom.png",
  qfwon: "/images/logos/qf-winner.png",
};

const stampKeywords: Record<keyof typeof stampImages, string[]> = {
  won: ["winning"],
  lost: ["losing"],
  top: ["top"],
  bottom: ["bottom"]
};

function getStampKey(dish: Dish | undefined): keyof typeof stampImages | undefined {
  const misc = dish?.miscellaneous;
  if (!misc || misc.length === 0) return undefined;

  const lowerTags = misc.map((tag) => tag.toLowerCase());

  for (const key of Object.keys(stampKeywords) as (keyof typeof stampKeywords)[]) {
    const keywords = stampKeywords[key];
    const matches = lowerTags.some((tag) => keywords.some((kw) => tag.includes(kw)));

    if (!matches) continue;

    if (key === "won" && dish?.competition === "Quickfire") {
      return "qfwon";
    }

    return key;
  }

  return undefined;
}

export default function PhotoCard({
  dish
}: {
  key: string;
  dish: Dish;
}) {
  const stampKey = getStampKey(dish);
  const stampSrc = stampKey ? stampImages[stampKey] : undefined;

  return (
    <Link
      href={`/dishes/${dish.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        className="photo-card"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            aspectRatio: "1 / 1",
            overflow: "hidden",
            border: "2px solid black",
          }}
        >
          <img
            src={tryImage(dish.slug)}
            alt={dish.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "14px"
          }}
        >
          {dish.name}
        </div>

        {dish.chef && dish.chef.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              bottom: "8px",
              maxWidth: "calc(100% - 24px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "12px",
              fontStyle: "italic",
              color: "#888",
            }}
          >
            by {dish.chef.map((c) => chefDisplayName(c, "first")).join(", ")}
          </div>
        )}

        {stampSrc && (
          <img
            src={stampSrc}
            alt={`${stampKey} stamp`}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-12px",
              width: "80px",
              height: "80px",
              transform: "rotate(25deg)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
      </div>
    </Link>
  );
}