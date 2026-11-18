"use client";

import { useState } from "react";

type Donation = {
  id: number;
  food: string;
  quantity: number;
  organisation: string;
  date: string;
  status: "Available" | "Assigned" | "Donated";
};

export default function RedistributionPage() {
  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, food: "Veg Meals", quantity: 15, organisation: "Helping Hands NGO", date: "2026-11-18", status: "Donated" },
    { id: 2, food: "Curd Rice", quantity: 10, organisation: "Food Care Foundation", date: "2026-11-18", status: "Assigned" },
    { id: 3, food: "Idli & Sambar", quantity: 8, organisation: "Not assigned", date: "2026-11-18", status: "Available" },
    { id: 4, food: "Lemon Rice", quantity: 12, organisation: "Not assigned", date: "2026-11-18", status: "Available" },
  ]);

  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const available = donations.filter((d) => d.status === "Available").length;
  const assigned = donations.filter((d) => d.status === "Assigned").length;
  const donated = donations.filter((d) => d.status === "Donated").length;

  const addDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quantityNumber = Number(quantity);

    if (!food.trim() || !Number.isInteger(quantityNumber) || quantityNumber <= 0) {
      setMessage("Please enter a food name and a valid whole-number quantity.");
      return;
    }

    setDonations((previous) => [
      ...previous,
      {
        id: Date.now(),
        food: food.trim(),
        quantity: quantityNumber,
        organisation: "Not assigned",
        date: new Date().toISOString().slice(0, 10),
        status: "Available",
      },
    ]);

    setFood("");
    setQuantity("");
    setOrganisation("");
    setMessage("Surplus food record added successfully!");
  };

  const updateDonation = (id: number, status: Donation["status"]) => {
    setDonations((previous) =>
      previous.map((d) => {
        if (d.id !== id) return d;

        return {
          ...d,
          status,
          organisation:
            status === "Available"
              ? "Not assigned"
              : organisation.trim() || d.organisation,
        };
      })
    );
  };

  const filteredDonations = donations.filter(
    (d) => filter === "All" || d.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            KITCHEN ADMIN / REDISTRIBUTION
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Food Redistribution
          </h1>
          <p className="mt-2 text-gray-500">
            Manage surplus food and track donations to organisations.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Available Donations</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">{available}</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Assigned Donations</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">{assigned}</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed Donations</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{donated}</h2>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Record Surplus Food
          </h2>

          <form onSubmit={addDonation} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Food Item
              </label>
              <input
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Example: Veg Meals"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Surplus Quantity (Portions)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Example: 20"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                + Add Surplus Food
              </button>
              {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
            </div>
          </form>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Donation Records</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track each surplus food donation.
            </p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-3 text-gray-700"
          >
            <option value="All">All Records</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Donated">Donated</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Food Item</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Organisation</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Update</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-semibold text-gray-800">{d.food}</td>
                    <td className="px-5 py-4 text-gray-600">{d.quantity} portions</td>
                    <td className="px-5 py-4 text-gray-600">{d.organisation}</td>
                    <td className="px-5 py-4 text-gray-600">{d.date}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        d.status === "Available"
                          ? "bg-orange-100 text-orange-700"
                          : d.status === "Assigned"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={d.status}
                        onChange={(e) => updateDonation(d.id, e.target.value as Donation["status"])}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
                      >
                        <option value="Available">Available</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Donated">Donated</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredDonations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      No donation records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
          <h3 className="font-bold text-green-800">Food Safety Reminder</h3>
          <p className="mt-1 text-sm text-green-700">
            Only redistribute food that has been safely handled and is suitable
            for consumption. Record actual handover details when a donation is completed.
          </p>
        </div>

      </div>
    </div>
  );
}