import Image from "next/image";
import Link from "next/link";
import dishes from "@/lib/dishes.json";
import { notFound } from "next/navigation";
import { chefSlug, tagSlug } from "@/lib/tag-utils";

function getImagePath(slug: string) {
  const season = slug.slice(0, 3);
  const episode = slug.slice(3, 6);
  const file = slug.slice(6);

  return `/images/${season}/${episode}/${file}.webp`;
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

  return (
    <main className="dish-page">
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
                <Image
                  src={getImagePath(dish.slug)}
                  alt={dish.name}
                  width={1920}
                  height={1080}
                />
              </div>

              <div className="recipe-photo">
                <div className="recipe-placeholder">
                  Second Image
                </div>
              </div>

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
                  <Link
                    href={`/seasons/${dish.season}`}
                    className="recipe-link"
                  >
                    Season {dish.season}
                  </Link>
                </dd>
              </div>


              <div>
                <dt>Episode</dt>
                <dd>
                  <Link
                    href={`/episodes/${dish.season}-${dish.episode}`}
                    className="recipe-link"
                  >
                    Episode {dish.episode}
                  </Link>
                </dd>
              </div>

              <div>
                <dt>Miscellaneous</dt>
                <dd>
                  {/* Future metadata */}
                  —
                </dd>
              </div>

            </dl>

          </aside>

        </div>

      </article>
    </main>
  );
}