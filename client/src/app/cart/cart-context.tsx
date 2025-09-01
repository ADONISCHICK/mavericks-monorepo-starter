"use client";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
};

type State = { items: CartItem[] };
type Action =
  | { type: "ADD"; item: Omit<CartItem,"quantity">; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  add: (item: Omit<CartItem,"quantity">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const qty = Math.max(1, action.qty ?? 1);
      const idx = state.items.findIndex(i => i.id === action.item.id);
      if (idx >= 0) {
        const items = state.items.slice();
        items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
        return { items };
      }
      return { items: [...state.items, { ...action.item, quantity: qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.id !== action.id) };
    case "SET_QTY": {
      const items = state.items.map(i => i.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i);
      return { items };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "mavericks_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, () => {
    if (typeof window === "undefined") return { items: [] };
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"items":[]}'); }
    catch { return { items: [] }; }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const api = useMemo(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((n, i) => n + i.price * i.quantity, 0);
    return {
      state, dispatch,
      add: (item: Omit<CartItem,"quantity">, qty?: number) => dispatch({ type: "ADD", item, qty }),
      remove: (id: string) => dispatch({ type: "REMOVE", id }),
      setQty: (id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      count, subtotal
    };
  }, [state]);

  
  useEffect(() => {
    function h(e:any){ api.add(e.detail); }
    if (typeof window!=="undefined"){ window.addEventListener("mavericks:addToCart", h); return () => window.removeEventListener("mavericks:addToCart", h); }
  }, [api]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
