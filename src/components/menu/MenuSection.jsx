import { useMemo, useState } from "react";
import { menuData } from "../../data/menu.js";

function formatPrice(item) {
  if (item.priceRange && Array.isArray(item.priceRange)) {
    return `GH₵ ${item.priceRange[0]}–${item.priceRange[1]}`;
  }
  return `GH₵ ${item.price}`;
}

export default function MenuSection() {
  const categories = useMemo(() => menuData.map((c) => c.category), []);
  const [activeCategory, setActiveCategory] = useState(
    categories?.[0] || "Main Dishes"
  );

  const activeData = useMemo(() => {
    return menuData.find((c) => c.category === activeCategory) || menuData[0];
  }, [activeCategory]);

  return (
    <section aria-label="Menu and Prices" className="py-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
            Order Food
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Menu & Prices
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
            Explore our carefully prepared dishes, grills, drinks and house
            specials. Freshly made and served with quality.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={isActive}
                className={`rounded-full border px-5 py-3 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "border-amber-400 bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                    : "border-white/10 bg-white/5 text-white/75 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {activeData?.items?.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.07]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-4 right-4 rounded-full border border-amber-400/30 bg-black/60 px-4 py-1.5 text-sm font-semibold text-amber-300 backdrop-blur-sm">
                  {formatPrice(item)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.name}
                </h3>

                {item.desc ? (
                  <p className="mt-3 text-sm leading-7 text-white/65 sm:text-[15px]">
                    {item.desc}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-white/40 sm:text-[15px]">
                    Freshly prepared with quality ingredients and rich flavor.
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Premium Dish
                  </span>

                  <a
                    href="#reservation"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:border-amber-400 hover:text-amber-400"
                  >
                    Order / Book
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}