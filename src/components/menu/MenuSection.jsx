import { useEffect, useMemo, useRef, useState } from "react";
import { menuData } from "../../data/menu.js";
import { supabase } from "../../lib/supabase";

function formatPrice(item) {
  if (item.priceRange && Array.isArray(item.priceRange)) {
    return `GH₵ ${item.priceRange[0]}–${item.priceRange[1]}`;
  }
  return `GH₵ ${item.price}`;
}

function getBasePrice(item) {
  if (item.priceRange && Array.isArray(item.priceRange)) {
    return Number(item.priceRange[0]) || 0;
  }
  return Number(item.price) || 0;
}

function generateOrderId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NAG-${Date.now().toString().slice(-6)}-${random}`;
}

function getStoredCustomerOrder() {
  try {
    const saved = localStorage.getItem("nelly_ange_last_order");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString();
}

export default function MenuSection() {
  const categories = useMemo(() => menuData.map((c) => c.category), []);
  const [activeCategory, setActiveCategory] = useState(
    categories?.[0] || "Main Dishes"
  );

  const trackingSectionRef = useRef(null);
  const historySectionRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    quantity: 1,
    orderType: "pickup",
    address: "",
    notes: "",
  });

  const [trackingForm, setTrackingForm] = useState({
    orderId: "",
    phone: "",
  });

  const activeData = useMemo(() => {
    return menuData.find((c) => c.category === activeCategory) || menuData[0];
  }, [activeCategory]);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  useEffect(() => {
    restoreLastOrderSession();
  }, []);

  const closeModal = () => {
    setSelectedItem(null);
    setOrderForm({
      customerName: "",
      phone: "",
      quantity: 1,
      orderType: "pickup",
      address: "",
      notes: "",
    });
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleTrackingInputChange = (e) => {
    const { name, value } = e.target;
    setTrackingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openOrderModal = (item) => {
    setSelectedItem(item);
    setOrderSuccess(null);
  };

  const saveCustomerOrderSession = (orderId, phone) => {
    localStorage.setItem(
      "nelly_ange_last_order",
      JSON.stringify({
        orderId,
        phone,
        savedAt: new Date().toISOString(),
      })
    );
  };

  const clearCustomerOrderSession = () => {
    localStorage.removeItem("nelly_ange_last_order");
    setOrderSuccess(null);
    setTrackingResult(null);
    setOrderHistory([]);
    setTrackingForm({
      orderId: "",
      phone: "",
    });
  };

  const scrollToTracking = () => {
    trackingSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToHistory = () => {
    historySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const mapOrderRowToTrackingResult = (data) => {
    return {
      id: data.order_id,
      itemName: data.item_name,
      itemImage:
        menuData
          .flatMap((category) => category.items)
          .find((item) => item.name === data.item_name)?.image || "",
      customerName: data.customer_name,
      phone: data.phone,
      quantity: data.quantity,
      orderType: data.order_type,
      address: data.address,
      notes: data.notes,
      total: Number(data.total_price),
      status: data.status,
      paymentStatus: data.payment_status,
      paymentReference: data.payment_reference,
      createdAt: data.created_at,
      estimatedTime:
        data.order_type === "delivery" ? "45 - 60 minutes" : "20 - 35 minutes",
    };
  };

  const loadOrderHistory = async (phone) => {
    if (!phone?.trim()) return;

    setHistoryLoading(true);
    setHistoryError("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("phone", phone.trim())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Order history error:", error);
      setHistoryError("Unable to load order history right now.");
      setOrderHistory([]);
      setHistoryLoading(false);
      return;
    }

    setOrderHistory(data || []);
    setHistoryLoading(false);
  };

  const restoreLastOrderSession = async () => {
    const savedOrder = getStoredCustomerOrder();

    if (!savedOrder?.orderId || !savedOrder?.phone) return;

    setTrackingForm({
      orderId: savedOrder.orderId,
      phone: savedOrder.phone,
    });

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", savedOrder.orderId)
      .eq("phone", savedOrder.phone)
      .maybeSingle();

    if (error || !data) return;

    setTrackingResult(mapOrderRowToTrackingResult(data));
    await loadOrderHistory(data.phone);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!selectedItem || submittingOrder) return;

    setSubmittingOrder(true);
    setOrderSuccess(null);
    setTrackingError("");

    const orderId = generateOrderId();
    const unitPrice = getBasePrice(selectedItem);
    const total = unitPrice * Number(orderForm.quantity);

    const newOrder = {
      id: orderId,
      itemName: selectedItem.name,
      itemImage: selectedItem.image,
      priceLabel: formatPrice(selectedItem),
      unitPrice,
      total,
      status: "Pending",
      paymentStatus: "Unpaid",
      paymentReference: null,
      createdAt: new Date().toISOString(),
      estimatedTime:
        orderForm.orderType === "delivery"
          ? "45 - 60 minutes"
          : "20 - 35 minutes",
      ...orderForm,
    };

    const { error } = await supabase.from("orders").insert([
      {
        order_id: orderId,
        customer_name: orderForm.customerName,
        phone: orderForm.phone,
        item_name: selectedItem.name,
        quantity: Number(orderForm.quantity),
        total_price: total,
        order_type: orderForm.orderType,
        address: orderForm.address,
        notes: orderForm.notes,
        status: "Pending",
        payment_status: "Unpaid",
        payment_reference: null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Order failed to save. Please try again.");
      setSubmittingOrder(false);
      return;
    }

    saveCustomerOrderSession(newOrder.id, newOrder.phone);

    setOrderSuccess(newOrder);
    setTrackingResult(newOrder);
    setTrackingForm({
      orderId: newOrder.id,
      phone: newOrder.phone,
    });

    await loadOrderHistory(newOrder.phone);

    closeModal();
    setSubmittingOrder(false);

    setTimeout(() => {
      scrollToTracking();
    }, 200);
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (trackingOrder) return;

    setTrackingOrder(true);
    setTrackingError("");
    setTrackingResult(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", trackingForm.orderId.trim())
      .eq("phone", trackingForm.phone.trim())
      .maybeSingle();

    if (error) {
      console.error("Supabase tracking error:", error);
      setTrackingError("Unable to track order right now. Please try again.");
      setTrackingOrder(false);
      return;
    }

    if (!data) {
      setTrackingError("No order found with that Order ID and phone number.");
      setTrackingOrder(false);
      return;
    }

    setTrackingResult(mapOrderRowToTrackingResult(data));
    saveCustomerOrderSession(data.order_id, data.phone);
    await loadOrderHistory(data.phone);
    setTrackingOrder(false);
  };

  return (
    <section
      id="menu"
      aria-label="Menu and Prices"
      className="py-6 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Premium Dish
                  </span>

                  <button
                    type="button"
                    onClick={() => openOrderModal(item)}
                    className="rounded-full border border-amber-400 bg-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02] hover:bg-amber-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          ref={trackingSectionRef}
          className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-amber-400">
              Track Order
            </p>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Check Your Order Status
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              Enter your Order ID and phone number to track your food order.
            </p>
          </div>

          <form
            onSubmit={handleTrackOrder}
            className="grid gap-4 md:grid-cols-3 md:items-end"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Order ID
              </label>
              <input
                type="text"
                name="orderId"
                value={trackingForm.orderId}
                onChange={handleTrackingInputChange}
                placeholder="e.g. NAG-123456-7890"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={trackingForm.phone}
                onChange={handleTrackingInputChange}
                placeholder="Enter phone number"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={trackingOrder}
              className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {trackingOrder ? "Tracking..." : "Track Order"}
            </button>
          </form>

          {trackingError ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {trackingError}
            </div>
          ) : null}

          {trackingResult ? (
            <div className="mt-6 rounded-[1.75rem] border border-amber-400/20 bg-black/20 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {trackingResult.itemImage ? (
                  <img
                    src={trackingResult.itemImage}
                    alt={trackingResult.itemName}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 text-xs uppercase tracking-[0.2em] text-white/40">
                    No Image
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-xl font-semibold text-white">
                      {trackingResult.itemName}
                    </h4>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                      {trackingResult.status}
                    </span>
                    {trackingResult.paymentStatus ? (
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
                        {trackingResult.paymentStatus}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-white">Order ID:</span>{" "}
                      {trackingResult.id}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Customer:</span>{" "}
                      {trackingResult.customerName}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Quantity:</span>{" "}
                      {trackingResult.quantity}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Type:</span>{" "}
                      {trackingResult.orderType}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Total:</span>{" "}
                      GH₵ {trackingResult.total}
                    </p>
                    <p>
                      <span className="font-semibold text-white">
                        Estimated Time:
                      </span>{" "}
                      {trackingResult.estimatedTime}
                    </p>
                  </div>

                  {trackingResult.address ? (
                    <p className="mt-3 text-sm text-white/70">
                      <span className="font-semibold text-white">Address:</span>{" "}
                      {trackingResult.address}
                    </p>
                  ) : null}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={clearCustomerOrderSession}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-red-400 hover:text-red-300"
                    >
                      Clear Saved Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div
          ref={historySectionRef}
          className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-amber-400">
              Order History
            </p>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Your Previous Orders
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              Your recent orders will appear here after tracking or placing an
              order.
            </p>
          </div>

          {historyError ? (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {historyError}
            </div>
          ) : null}

          {historyLoading ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-white/60">
              Loading order history...
            </div>
          ) : orderHistory.length > 0 ? (
            <div className="grid gap-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {order.item_name}
                      </h4>
                      <p className="mt-1 text-sm text-white/60">
                        Order ID: {order.order_id}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {order.status}
                      </span>
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
                        {order.payment_status || "Unpaid"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-white">Quantity:</span>{" "}
                      {order.quantity}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Type:</span>{" "}
                      {order.order_type}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Total:</span>{" "}
                      GH₵ {Number(order.total_price)}
                    </p>
                    <p>
                      <span className="font-semibold text-white">
                        Payment Ref:
                      </span>{" "}
                      {order.payment_reference || "-"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingForm({
                          orderId: order.order_id,
                          phone: order.phone,
                        });
                        saveCustomerOrderSession(order.order_id, order.phone);
                        scrollToTracking();
                      }}
                      className="rounded-full border border-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 transition hover:bg-amber-400 hover:text-black"
                    >
                      Track This Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-white/50">
              No order history yet.
            </div>
          )}
        </div>

        {orderSuccess ? (
          <div className="mt-8 rounded-[1.75rem] border border-green-500/20 bg-green-500/10 p-5 text-sm text-green-300">
            <p>
              Order placed successfully. Your Order ID is{" "}
              <span className="font-bold text-white">{orderSuccess.id}</span>.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToTracking}
                className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-300"
              >
                Track This Order
              </button>

              <button
                type="button"
                onClick={scrollToHistory}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-amber-400 hover:text-amber-400"
              >
                View Order History
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#111111] p-5 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:border-amber-400 hover:text-amber-400"
              aria-label="Close order modal"
            >
              ×
            </button>

            <div className="mb-6 flex flex-col gap-5 sm:flex-row">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="h-44 w-full rounded-[1.5rem] object-cover sm:h-36 sm:w-40"
              />

              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-400">
                  Complete Order
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {selectedItem.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {selectedItem.desc ||
                    "Freshly prepared with quality ingredients and rich flavor."}
                </p>
                <div className="mt-4 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                  {formatPrice(selectedItem)}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderForm.customerName}
                    onChange={handleOrderInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={orderForm.phone}
                    onChange={handleOrderInputChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={orderForm.quantity}
                    onChange={handleOrderInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Order Type
                  </label>
                  <select
                    name="orderType"
                    value={orderForm.orderType}
                    onChange={handleOrderInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                  >
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                    <option value="dine-in">Dine In</option>
                  </select>
                </div>
              </div>

              {orderForm.orderType === "delivery" ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={orderForm.address}
                    onChange={handleOrderInputChange}
                    rows="3"
                    placeholder="Enter delivery address"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                    required
                  />
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Order Notes
                </label>
                <textarea
                  name="notes"
                  value={orderForm.notes}
                  onChange={handleOrderInputChange}
                  rows="3"
                  placeholder="Extra instructions, spice level, drinks, etc."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-400"
                />
              </div>

              <div className="mt-2 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-white/60">Estimated Total</p>
                  <p className="text-2xl font-bold text-white">
                    GH₵ {getBasePrice(selectedItem) * Number(orderForm.quantity)}
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    Your order will be saved without online payment
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submittingOrder}
                  className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submittingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}