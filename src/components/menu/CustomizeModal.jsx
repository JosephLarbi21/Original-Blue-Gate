import { useState } from "react";
import { useCart } from "../../context/useCart";

export default function CustomizeModal({ item, onClose }) {
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [note, setNote] = useState("");

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsTotal = selectedAddons.reduce(
    (sum, a) => sum + a.price,
    0
  );

  const total =
    (item.price + addonsTotal) * qty;

  const handleAddToCart = () => {
    addToCart({
      productId: item.id,
      name: item.name,
      basePrice: item.price,
      qty,
      addons: selectedAddons,
      note,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div style={{ background: "white", color: "black", padding: 20 }}>

        <h3>{item.name}</h3>
        <p>{item.description}</p>

        {/* Quantity */}
        <div style={{ marginTop: 12 }}>
          <label>Quantity</label>
          <div>
            <button onClick={() => setQty(Math.max(1, qty - 1))}>
              −
            </button>
            <span style={{ margin: "0 12px" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        {/* Add-ons */}
        {item.addons?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h4>Add-ons</h4>
            {item.addons.map((addon) => (
              <label key={addon.id} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  onChange={() => toggleAddon(addon)}
                />
                {addon.name} (+₵{addon.price})
              </label>
            ))}
          </div>
        )}

        {/* Note */}
        <div style={{ marginTop: 16 }}>
          <textarea
            placeholder="Special instructions..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20 }}>
          <strong>Total: ₵{total.toFixed(2)}</strong>
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
