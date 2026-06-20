import Link from "next/link";

function getImagePath(slug: string) {
  return `/images/chefs/${slug}.webp`;
}

export default function ChefCard({
  key,
  chef,
}: {
  key: string;
  chef: string;
}) {
  return (
    <Link
      href={`/chefs/${chef}`}
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
          width: "190px",
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
            src={getImagePath(chef)}
            alt={chef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.65)"
            }}
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "18px"
          }}
        >
          {chef}
        </div>
      </div>
    </Link>
  );
}