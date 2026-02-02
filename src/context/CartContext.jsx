import React, { createContext, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((x) => x.lineId === action.payload.lineId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.lineId === action.payload.lineId ? { ...x, qty: x.qty + action.payload.qty } : x
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE":
      return { ...state, items: state.items.filter((x) => x.lineId !== action.lineId) };

    case "QTY":
      return {
        ...state,
        items: state.items.map((x) => (x.lineId === action.lineId ? { ...x, qty: action.qty } : x)),
      };

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = ({ productId, name, basePrice, qty, addons, note }) => {
    const addonKey = (addons || []).map((a) => a.id).sort().join("-");
    const lineId = `${productId}__${addonKey || "no_addons"}`;

    dispatch({
      type: "ADD",
      payload: {
        lineId,
        productId,
        name,
        basePrice,
        qty,
        addons: addons || [],
        note: note || "",
      },
    });
  };

  const removeItem = (lineId) => dispatch({ type: "REMOVE", lineId });
  const updateQty = (lineId, qty) => dispatch({ type: "QTY", lineId, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const addonsTotal = item.addons.reduce((a, b) => a + (b.price || 0), 0);
      return sum + (item.basePrice + addonsTotal) * item.qty;
    }, 0);
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeItem,
      updateQty,
      clearCart,
      subtotal,
    }),
    [state.items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
