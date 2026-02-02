import { useState } from "react";
import { MENU } from "../../data/menu";
import CustomizeModal from "./CustomizeModal";

export default function MenuSection() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="section menu" id="menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">
          Special Selection
        </p>
        <h2 className="headline-1 section-title text-center">
          Delicious Menu
        </h2>

        <ul className="grid-list">
          {MENU.map((item) => (
            <li key={item.id}>
              <div
                className="menu-card hover:card"
                role="button"
                onClick={() => setSelectedItem(item)}
              >
                <figure
                  className="card-banner img-holder"
                  style={{ "--width": 100, "--height": 100 }}
                >
                  <img
                    src={item.image}
                    width="100"
                    height="100"
                    alt={item.name}
                    className="img-cover"
                  />
                </figure>

                <div>
                  <div className="title-wrapper">
                    <h3 className="title-3">{item.name}</h3>
                    <span className="span title-2">
                      ₵{item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="card-text label-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {selectedItem && (
          <CustomizeModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </section>
  );
}
