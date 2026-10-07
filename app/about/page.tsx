import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <main>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "16px" }}>
          About
        </h1>

        <p style={{ marginBottom: "16px" }}>
          This is a fan-made catalog and celebration of every dish cooked on Top Chef:
          searchable and filterable for the discerning hobbyist or superfan.
        </p>

        <p style={{ marginBottom: "16px" }}>
          Created by Kurtis Losereit. Not affiliated with or endorsed by
          Bravo Media or Top Chef.
        </p>

        <p style={{ marginBottom: "16px" }}>
          Bugs, corrections, or suggestions? Drop me a line at{" "}
          <Link href="mailto:kurtlosereit@gmail.com" className="recipe-link">
            kurtlosereit@gmail.com
          </Link>
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>
          Data & Attribution
        </h2>

        <p style={{ marginBottom: "16px" }}>
          Episode title data is sourced from{" "}
          <Link
            href="https://www.themoviedb.org"
            className="recipe-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Movie Database (TMDB)
          </Link>
          . Dish details, tags, and results are compiled and maintained by
          hand.
        </p>

        {/* Required TMDB attribution block. Per TMDB's terms, this needs:
              1. one of their approved, unmodified logos
              2. their exact required notice text
              3. this site's own branding must read as more prominent than
                 the TMDB logo — so keep this small and secondary, not a
                 hero element.
            Download an approved logo from:
              https://www.themoviedb.org/about/logos-attribution
            and place it at /public/images/logos/tmdb.svg (or update the
            src below to wherever you save it). */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            border: "2px solid black",
            borderRadius: "8px",
            background: "#fffdf6",
            maxWidth: "480px",
          }}
        >
          <Image
            src="/images/logos/tmdb.svg"
            alt="TMDB logo"
            width={32}
            height={32}
            style={{ flexShrink: 0 }}
          />
          <p style={{ fontSize: "0.8rem", opacity: 0.75, margin: 0 }}>
            This product uses the TMDB API but is not endorsed, certified,
            or otherwise approved by TMDB.
          </p>
        </div>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>
          Support the Site
        </h2>

        <p style={{ marginBottom: "16px" }}>
          If you find this useful, consider{" "}
          <Link
            href="https://buymeacoffee.com/kurtlosereit"
            className="recipe-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            buying me a coffee
          </Link>{" "}
          to help keep it running!
        </p>
      </main>
    </div>
  );
}