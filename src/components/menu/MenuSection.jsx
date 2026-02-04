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
  const [activeCategory, setActiveCategory] = useState(categories?.[0] || "Main Dishes");

  const activeData = useMemo(() => {
    return menuData.find((c) => c.category === activeCategory) || menuData[0];
  }, [activeCategory]);

  return (
    <section className="section menu menu-ecom" aria-label="menu-label" id="menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">Order Food</p>
        <h2 className="headline-1 section-title text-center">Menu & Prices</h2>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist" aria-label="Menu Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`menu-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="menu-cards">
          {activeData?.items?.map((item) => (
            <div className="menu-card-box" key={item.name}>
              <div className="menu-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>

              <div className="menu-card-body">
                <div className="menu-card-top">
                  <p className="menu-card-name">{item.name}</p>
                  <p className="menu-card-price">{formatPrice(item)}</p>
                </div>

                {item.desc ? <p className="menu-card-desc">{item.desc}</p> : null}

                {/* "Add Now" removed for now */}
                {/*
                <button className="menu-add-btn" type="button">
                  Add
                </button>
                */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
