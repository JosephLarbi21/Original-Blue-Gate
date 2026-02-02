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

        {/* Items */}
        <div className="menu-items">
          {activeData?.items?.map((item) => (
            <div className="menu-item-card" key={item.name}>
              <div className="menu-item-left">
                <p className="menu-item-name">{item.name}</p>
              </div>

              <div className="menu-item-right">
                <p className="menu-item-price">{formatPrice(item)}</p>

                {/* Placeholder button for later cart step */}
                <button className="menu-add-btn" type="button">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}
