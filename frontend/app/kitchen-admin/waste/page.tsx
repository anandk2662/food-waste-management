"use client";

import { useState } from "react";

type WasteItem = {
  id: number;
  name: string;
  prepared: number;
  collected: number;
  wasted: number;
  reason: string;
};

export default function WastePage() {
  const [items, setItems] = useState<WasteItem[]>([
    { id: 1, name: "Veg Meals", prepared: 150, collected: 130, wasted: 20, reason: "Excess preparation" },
    { id: 2, name: "Curd Rice", prepared: 100, collected: 85, wasted: 15, reason: "Low demand" },
    { id: 3, name: "Idli & Sambar", prepared: 80, collected: 75, wasted: 5, reason: "Unsold portions" },
    { id: 4, name: "Lemon Rice", prepared: 60, collected: 45, wasted: 15, reason: "Excess preparation" },
  ]);

  const [foodName, setFoodName] = useState("");
  const [prepared, setPrepared] = useState("");
  const [collected, setCollected] = useState("");
  const [reason, setReason] = useState("Excess preparation");
  const [message, setMessage] = useState("");

  const totalPrepared = items.reduce((sum, item) => sum + item.prepared, 0);
  const totalCollected = items.reduce((sum, item) => sum + item.collected, 0);
  const totalWasted = items.reduce((sum, item) => sum + item.wasted, 0);

  const wastePercentage =
    totalPrepared === 0 ? 0 : (totalWasted / totalPrepared) * 100;

  const addWasteRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preparedNumber = Number(prepared);
    const collectedNumber = Number(collected);

    if (
      !foodName.trim() ||
      preparedNumber <= 0 ||
      collectedNumber < 0 ||
      collectedNumber > preparedNumber ||
      !Number.isInteger(preparedNumber) ||
      !Number.isInteger(collectedNumber)
    ) {
      setMessage("Enter a valid food name and whole-number quantities. Collected portions cannot exceed prepared portions.");
      return;
    }

    const newItem: WasteItem = {
      id: Date.now(),
      name: foodName.trim(),
      prepared: preparedNumber,
      collected: collectedNumber,
      wasted: preparedNumber - collectedNumber,
      reason,
    };

    setItems((previous) => [...previous, newItem]);
    setFoodName("");
    setPrepared("");
    setCollected("");
    setReason("Excess preparation");
    setMessage("Waste record added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            KITCHEN ADMIN / WASTE TRACKING
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Food Waste Tracking
          </h1>
          <p className="mt-2 text-gray-500">
            Monitor leftover food and understand where food waste happens.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Prepared</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {totalPrepared}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Portions</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Collected</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {totalCollected}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Portions</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Food Wasted</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {totalWasted}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Portions</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Waste Percentage</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {wastePercentage.toFixed(1)}%
            </h2>
            <p className="mt-1 text-xs text-gray-400">Of prepared food</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Add Daily Waste Record
          </h2>

          <form onSubmit={addWasteRecord} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Food Item
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Reason for Waste
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              >
                <option>Excess preparation</option>
                <option>Low demand</option>
                <option>Unsold portions</option>
                <option>Food quality issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Portions Prepared
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={prepared}
                onChange={(e) => setPrepared(e.target.value)}
                placeholder="Example: 100"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Portions Collected
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={collected}
                onChange={(e) => setCollected(e.target.value)}
                placeholder="Example: 80"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                + Add Waste Record
              </button>
              {message && (
                <p className="mt-3 text-sm text-gray-600">{message}</p>
              )}
            </div>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Daily Food Waste Report
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Compare prepared portions with collected portions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Food Item</th>
                  <th className="px-5 py-4">Prepared</th>
                  <th className="px-5 py-4">Collected</th>
                  <th className="px-5 py-4">Wasted</th>
                  <th className="px-5 py-4">Reason</th>
                  <th className="px-5 py-4">Waste Level</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const percentage =
                    item.prepared === 0
                      ? 0
                      : (item.wasted / item.prepared) * 100;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.prepared}</td>
                      <td className="px-5 py-4 text-green-700">{item.collected}</td>
                      <td className="px-5 py-4 font-bold text-red-600">{item.wasted}</td>
                      <td className="px-5 py-4 text-gray-600">{item.reason}</td>
                      <td className="px-5 py-4">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${
                              percentage > 20 ? "bg-red-500" : "bg-orange-400"
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="mt-1 block text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <h3 className="font-bold text-orange-800">Waste Reduction Tip</h3>
          <p className="mt-1 text-sm text-orange-700">
            Compare leftover portions with previous demand and adjust the next
            day's preparation. This can help reduce unnecessary food production.
          </p>
        </div>

      </div>
    </div>
  );
}