import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import SearchAndNav from "@/components/SearchAndNav";
import dishes from "@/lib/dishes.json";

export const metadata: Metadata = {
  title: "Top Chef Dishes",
  description: "The only fansite dedicated to showcasing and celebrating the food of Top Chef.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="card-body">
        <div className="logo">
          <img src="/images/logos/Logo.png"></img>
        </div>

        <Link
          href="https://buymeacoffee.com/kurtlosereit"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            border: "2px solid black",
            background: "#fff8dc",
            color: "black",
            textDecoration: "none",
            fontWeight: 600,
            boxShadow: "4px 4px 0 black",
            transition: "transform 0.15s ease",
            position: "absolute",
            borderRadius: "12px",
            right: "12px",
            top: "12px",
            fontSize: "14px"
          }}
          className="coffeeButton"
        >
          ☕ Keep the Kitchen Running!
        </Link>

        <SearchAndNav dishes={dishes}/>

        <main>
          <div className="card-content p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
