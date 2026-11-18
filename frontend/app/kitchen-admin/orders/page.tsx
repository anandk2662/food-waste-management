"use client";

import { useState } from "react";

type Order = {
  id: number;
  student: string;
  item: string;
  quantity: number;
  type: string;
  status: string;
};

const initialOrders: Order[] = [
  { id: 101, student: "Ananya", item: "Veg Meals", quantity: 1, type: "Pre-order", status: "Confirmed" },
  { id: 102, student: "Rahul", item: "Curd Rice", quantity: 2, type: "Pre-order", status: "Preparing" },
  { id: 103, student: "Sneha", item: "Idli & Sambar", quantity: 1, type: "Counter", status: "Ready" },
  { id: 104, student: "Arjun", item: "Lemon Rice", quantity: 1, type: "Pre-order", status: "Collected" },
  { id: 105, student: "Priya", item: "Veg Meals", quantity: 2, type: "Pre-order", status: "Confirmed" },
  { id: 106, student: "Kiran", item: "Curd Rice", quantity: 1, type: "Counter", status: "No-show" },
  { id: 107, student: "Megha", item: "Idli & Sambar", quantity: 2, type: "Pre-order", status: "Preparing" },
  { id: 108, student: "Rohit", item: "Lemon Rice", quantity: 1, type: "Counter", status: "Ready" },
];

const statuses = [
  "Confirmed",
  "Preparing",
  "Ready",
  "Collected",
  "No-show",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function updateStatus(id: number, newStatus: string) {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.student.toLowerCase().includes(search.toLowerCase()) ||
      order.item.toLowerCase().includes(search.toLowerCase()) ||
      String(order.id).includes(search);

    const matchesFilter =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const confirmed = orders.filter((o) => o.status === "Confirmed").length;
  const preparing = orders.filter((o) => o.status === "Preparing").length;
  const ready = orders.filter((o) => o.status === "Ready").length;
  const collected = orders.filter((o) => o.status === "Collected").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">🌱 FoodWise</h1>
        <p className="text-slate-400 text-sm mb-8">Kitchen Admin</p>

        <nav className="space-y-2">
          <a href="/kitchen-admin/dashboard" className="block p-3 rounded-lg hover:bg-slate-700">
            📊 Dashboard
          </a>
          <a href="/kitchen-admin/menu" className="block p-3 rounded-lg hover:bg-slate-700">
            🍽️ Menu Management
          </a>
          <a href="/kitchen-admin/orders" className="block p-3 rounded-lg bg-green-700">
            📦 Orders
          </a>
          <a href="/kitchen-admin/demand" className="block p-3 rounded-lg hover:bg-slate-700">
            📈 Demand Prediction
          </a>
          <a href="/kitchen-admin/production" className="block p-3 rounded-lg hover:bg-slate-700">
            👩‍🍳 Production
          </a>
          <a href="/kitchen-admin/pickup" className="block p-3 rounded-lg hover:bg-slate-700">
            🎟️ Pickup
          </a>
          <a href="/kitchen-admin/waste" className="block p-3 rounded-lg hover:bg-slate-700">
            ♻️ Waste Tracking
          </a>
          <a href="/kitchen-admin/redistribution" className="block p-3 rounded-lg hover:bg-slate-700">
            🤝 Redistribution
          </a>
          <a href="/kitchen-admin/feedback" className="block p-3 rounded-lg hover:bg-slate-700">
            ⭐ Feedback
          </a>
          <a href="/kitchen-admin/analytics" className="block p-3 rounded-lg hover:bg-slate-700">
            📊 Analytics
          </a>
        </nav>

        <a
          href="/kitchen-admin/login"
          className="block mt-8 p-3 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          ↩ Sign Out
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Orders Management
            </h2>
            <p className="text-slate-500 mt-2">
              Monitor and manage canteen orders.
            </p>
          </div>

          <a
            href="/kitchen-admin/dashboard"
            className="bg-white border px-4 py-2 rounded-lg hover:bg-slate-100 self-start"
          >
            ← Dashboard
          </a>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm">Confirmed</p>
            <h3 className="text-3xl font-bold mt-2">{confirmed}</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
            <p className="text-slate-500 text-sm">Preparing</p>
            <h3 className="text-3xl font-bold mt-2">{preparing}</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <p className="text-slate-500 text-sm">Ready</p>
            <h3 className="text-3xl font-bold mt-2">{ready}</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <p className="text-slate-500 text-sm">Collected</p>
            <h3 className="text-3xl font-bold mt-2">{collected}</h3>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search student, item or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-4 py-3 bg-white"
            >
              <option value="All">All Orders</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <div className="p-5 border-b">
            <h3 className="text-xl font-bold text-slate-800">
              Order List
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Sample orders for demonstration
            </p>
          </div>

          <table className="min-w-[800px] w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Food Item</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">#{order.id}</td>
                  <td className="p-4">{order.student}</td>
                  <td className="p-4">{order.item}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                      {order.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Preparing"
                          ? "bg-orange-100 text-orange-700"
                          : order.status === "Ready"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Collected"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border rounded-lg p-2 bg-white"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No orders found.
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Demo data only. Order status changes are temporary and are not saved to a database yet.
        </p>

      </main>
    </div>
  );
}