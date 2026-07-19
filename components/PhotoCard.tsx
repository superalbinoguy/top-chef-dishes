import { join } from "path";
import Link from "next/link";

function getImagePath(slug: string) {
  return `/images/${slug.slice(0, 3)}/${slug.slice(3, 6)}/${slug.slice(6)}`;
}

function tryImage(slug: string): string {
  const basePath = getImagePath(slug);

  return `${basePath}x.webp`;
}

export default function PhotoCard({
  dish
}: {
  key: string;
  dish: Dish;
}) {
  return (
    <Link
      href={`/dishes/${dish.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="photo-card"
        style={{
          background: "#fff",
          padding: "12px 12px 32px",
          border: "2px solid black",
          boxShadow: "8px 8px 0 black",
          width: "200px",
        }}
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
      </div>
    </Link>
  );
}