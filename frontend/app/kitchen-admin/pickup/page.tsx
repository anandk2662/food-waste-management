"use client";

import { useState } from "react";

type PickupOrder = {
  id: number;
  token: string;
  student: string;
  item: string;
  quantity: number;
  status: "Waiting" | "Ready" | "Collected";
};

export default function PickupPage() {
  const [orders, setOrders] = useState<PickupOrder[]>([
    { id: 1, token: "T101", student: "Rahul", item: "Veg Meals", quantity: 1, status: "Waiting" },
    { id: 2, token: "T102", student: "Priya", item: "Curd Rice", quantity: 1, status: "Ready" },
    { id: 3, token: "T103", student: "Arjun", item: "Idli & Sambar", quantity: 2, status: "Waiting" },
    { id: 4, token: "T104", student: "Sneha", item: "Lemon Rice", quantity: 1, status: "Collected" },
    { id: 5, token: "T105", student: "Kiran", item: "Veg Meals", quantity: 1, status: "Ready" },
    { id: 6, token: "T106", student: "Ananya", item: "Curd Rice", quantity: 2, status: "Waiting" },
    { id: 7, token: "T107", student: "Rohan", item: "Idli & Sambar", quantity: 1, status: "Collected" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: number, status: PickupOrder["status"]) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.token.toLowerCase().includes(search.toLowerCase()) ||
      order.student.toLowerCase().includes(search.toLowerCase()) ||
      order.item.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const waiting = orders.filter((o) => o.status === "Waiting").length;
  const ready = orders.filter((o) => o.status === "Ready").length;
  const collected = orders.filter((o) => o.status === "Collected").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            KITCHEN ADMIN / PICKUP
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Pickup & Token Management
          </h1>
          <p className="mt-2 text-gray-500">
            Manage student tokens and food collection status.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Waiting for Preparation</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">{waiting}</h2>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Ready for Pickup</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">{ready}</h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Successfully Collected</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{collected}</h2>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row">
          <input
            type="text"
            placeholder="Search token, student or food item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
          >
            <option value="All">All Orders</option>
            <option value="Waiting">Waiting</option>
            <option value="Ready">Ready</option>
            <option value="Collected">Collected</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-xl font-bold text-gray-800">
              Student Pickup Queue
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update each order when food is ready or collected.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Token</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Food Item</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Update Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bold text-green-700">
                      {order.token}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {order.student}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {order.item}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {order.quantity}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "Waiting"
                            ? "bg-orange-100 text-orange-700"
                            : order.status === "Ready"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value as PickupOrder["status"]
                          )
                        }
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="Waiting">Waiting</option>
                        <option value="Ready">Ready</option>
                        <option value="Collected">Collected</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      No matching pickup orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
          <h3 className="font-bold text-green-800">Pickup Reminder</h3>
          <p className="mt-1 text-sm text-green-700">
            Verify the student's token before handing over the food. Mark the
            order as Collected only after the student receives it.
          </p>
        </div>

      </div>
    </div>
  );
}