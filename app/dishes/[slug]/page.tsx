import Link from "next/link";
import fs from "fs";
import path from "path";
import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";
import { chefSlug, tagSlug } from "@/lib/tag-utils";
import ZoomableImage from "@/components/ZoomableImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAdjacentDishes } from "@/lib/dish-order";

function getImagePath(slug: string) {
  const season = slug.slice(0, 3);
  const episode = slug.slice(3, 6);
  const file = slug.slice(6);

  return `/images/${season}/${episode}/${file}`;
}

function hasSecondImage(slug: string) {
  const imagePath = path.join(
    process.cwd(),
    "public",
    getImagePath(slug).concat("b.webp")
  );

  return fs.existsSync(imagePath);
}

type TimeLimit = {
  minutes: number | null;
  segments: number[];
  overnight: boolean | null;
  status: "timed" | "overnight_unspecified" | "untimed" | "unknown";
};

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const mins = total % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

function formatTimeLimit(limit: TimeLimit) {
  switch (limit.status) {
    case "timed":
      if (limit.segments.length > 1) {
        const days = limit.segments
          .map((minutes, i) => `Day ${i + 1}: ${formatMinutes(minutes)}`)
          .join(" · ");
        return `${days} (${formatMinutes(limit.minutes ?? 0)} total)`;
      }
      return formatMinutes(limit.minutes ?? 0);

    case "overnight_unspecified":
      return "Overnight cook (time unspecified)";

    case "untimed":
      return "No time limit / non-standard clock";

    default:
      return "Unknown";
  }
}

function TagSection({
  title,
  href,
  values,
}: {
  title: string;
  href: string;
  values: string[];
}) {
  return (
    <section className="tag-section">
      <h3>{title}</h3>

      <div className="tag-list">
        {values.map((value) => (
          <Link
            key={value}
            href={`/tags/${href}/${tagSlug(value)}`}
            className="tag-chip"
          >
            {value}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dish = dishes.find((d) => d.slug === slug);

  if (!dish) return notFound();

  const { prev, next } = getAdjacentDishes(dish.slug);

  return (
    <main className="dish-page">
      <div className="dish-carousel">
        <div className="dish-nav dish-nav-prev">
          {prev && (
            <Link
              href={`/dishes/${prev.slug}`}
              className="dish-nav-btn"
              aria-label={`Previous dish: ${prev.name}`}
              title={prev.name}
            >
              <ChevronLeft size={28} strokeWidth={3} />
            </Link>
          )}
        </div>
        <article className="recipe-card">

          <header className="recipe-header">
            <h1 className="recipe-title">
              {dish.name}
            </h1>

            <p className="recipe-subtitle">
              Top Chef Season {dish.season} • Episode {dish.episode}
            </p>
          </header>


          <div className="recipe-layout">

            <div>

              <div className="recipe-images">

                <div className="recipe-photo">
                  <ZoomableImage
                    src={getImagePath(dish.slug).concat(`.webp`)}
                    alt={dish.name}
                    width={1920}
                    height={1080}
                  />
                </div>

              {hasSecondImage(dish.slug) && (
                <div className="recipe-photo">
                  <ZoomableImage
                    src={getImagePath(dish.slug).concat("b.webp")}
                    alt={`${dish.name} - second image`}
                    width={1920}
                    height={1080}
                  />
                </div>
              )}
              </div>


              <TagSection
                title="Cuisine"
                href="cuisines"
                values={dish.cuisines}
              />

              <TagSection
                title="Ingredients"
                href="ingredients"
                values={dish.ingredients}
              />

              <TagSection
                title="Techniques"
                href="techniques"
                values={dish.techniques}
              />

              <TagSection
                title="Dish Types"
                href="dishes"
                values={dish.dishes}
              />

            </div>


            <aside className="recipe-sidebar">

              <h2>
                Recipe Information
              </h2>

              <dl className="recipe-info">

                <div>
                  <dt>Chef</dt>
                  <dd>
                    {dish.chef.map((chef, index) => (
                      <span key={chef}>
                        {index > 0 && ", "}
                        <Link
                          href={`/chefs/${chefSlug(chef)}`}
                          className="recipe-link"
                        >
                          {chef}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>


                <div>
                  <dt>Competition</dt>
                  <dd>
                    {dish.competition}
                  </dd>
                </div>


                <div>
                  <dt>Season</dt>
                  <dd>
                    Season {dish.season}
                  </dd>
                </div>


                <div>
                  <dt>Episode</dt>
                  <dd>
                    <Link
                      href={`/episodes/s${String(dish.season).padStart(2, "0")}e${String(dish.episode).padStart(2, "0")}`}
                      className="recipe-link"
                    >
                      Episode {dish.episode}
                    </Link>
                  </dd>
                </div>
                
                <div>
                  <dt>Time Limit</dt>
                  <dd>{formatTimeLimit(dish.time_limit as TimeLimit)}</dd>
                </div>

                <div>
                  <dt>Recipe</dt>
                  <dd>
                    {dish.recipe ? (
                      <a
                        href={dish.recipe}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="recipe-link"
                      >
                        View recipe
                      </a>
                    ) : (
                      "None"
                    )}
                  </dd>
                </div>

                <div>
                  <dt>Miscellaneous</dt>
                  <dd>
                  {dish.miscellaneous.length > 0
                    ? dish.miscellaneous.map((tag, index) => (
                        <span key={tag}>
                          {index > 0 && ", "}
                          {tag}
                        </span>
                      ))
                    : "None"}
                </dd>
                </div>

              </dl>

            </aside>

          </div>

        </article>
      <div className="dish-nav dish-nav-next">
        {next && (
          <Link
            href={`/dishes/${next.slug}`}
            className="dish-nav-btn"
            aria-label={`Next dish: ${next.name}`}
            title={next.name}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </Link>
        )}
      </div>
    </div>
  </main>
  );
}