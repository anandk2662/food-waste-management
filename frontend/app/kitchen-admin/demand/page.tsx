"use client";

import { useState } from "react";

const demandData = {
  Today: [
    { name: "Veg Meals", booked: 120, predicted: 140 },
    { name: "Curd Rice", booked: 85, predicted: 100 },
    { name: "Idli & Sambar", booked: 65, predicted: 80 },
    { name: "Lemon Rice", booked: 45, predicted: 60 },
  ],
  Tomorrow: [
    { name: "Veg Meals", booked: 0, predicted: 155 },
    { name: "Curd Rice", booked: 0, predicted: 110 },
    { name: "Idli & Sambar", booked: 0, predicted: 90 },
    { name: "Lemon Rice", booked: 0, predicted: 70 },
  ],
};

export default function DemandPage() {
  const [day, setDay] = useState<"Today" | "Tomorrow">("Today");

  const items = demandData[day];
  const totalPredicted = items.reduce((sum, item) => sum + item.predicted, 0);
  const totalBooked = items.reduce((sum, item) => sum + item.booked, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold">🌱 FoodWise</h1>
        <p className="text-slate-400 text-sm mt-2 mb-8">Kitchen Admin</p>

        <nav className="space-y-2">
          <a href="/kitchen-admin/dashboard" className="block p-3 rounded-lg hover:bg-slate-700">📊 Dashboard</a>
          <a href="/kitchen-admin/menu" className="block p-3 rounded-lg hover:bg-slate-700">🍽️ Menu Management</a>
          <a href="/kitchen-admin/orders" className="block p-3 rounded-lg hover:bg-slate-700">📦 Orders</a>
          <a href="/kitchen-admin/demand" className="block p-3 rounded-lg bg-green-700">📈 Demand Prediction</a>
          <a href="/kitchen-admin/login" className="block p-3 rounded-lg hover:bg-slate-700">↩ Sign Out</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Demand Prediction</h2>
            <p className="text-slate-500 mt-2">
              Estimate food requirements and reduce overproduction.
            </p>
          </div>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value as "Today" | "Tomorrow")}
            className="bg-white border rounded-lg p-3"
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-slate-500">Total Bookings</p>
            <h3 className="text-3xl font-bold mt-2">{totalBooked}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-slate-500">Predicted Demand</p>
            <h3 className="text-3xl font-bold mt-2">{totalPredicted}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <p className="text-slate-500">Extra Preparation</p>
            <h3 className="text-3xl font-bold mt-2">
              {totalPredicted - totalBooked}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Food Demand Overview
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Bookings compared with estimated demand. Sample demonstration figures.
          </p>

          <div className="space-y-7">
            {items.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-slate-500">
                    {item.booked} booked / {item.predicted} predicted
                  </span>
                </div>

                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{
                      width: `${(item.booked / Math.max(item.predicted, 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 mt-7 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full" />
              Booked
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-200 rounded-full" />
              Remaining predicted demand
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Food Preparation Plan</h3>
            <p className="text-sm text-slate-500 mt-1">
              Suggested preparation quantities for {day.toLowerCase()}.
            </p>
          </div>

          <table className="w-full min-w-[500px] text-left">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Food Item</th>
                <th className="p-4">Bookings</th>
                <th className="p-4">Predicted Demand</th>
                <th className="p-4">Suggested Preparation</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.name} className="border-b">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">{item.booked}</td>
                  <td className="p-4">{item.predicted}</td>
                  <td className="p-4 font-semibold text-green-700">
                    {item.predicted} portions
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-900">💡 Kitchen Recommendation</h3>
          <p className="text-green-800 mt-2 text-sm">
            Prepare food according to estimated demand, monitor actual bookings
            and adjust quantities to avoid unnecessary leftovers.
          </p>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          Demonstration data only. Predictions are currently sample estimates,
          not generated by a trained AI or machine learning model.
        </p>

      </main>
    </div>
  );
}