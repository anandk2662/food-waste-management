"use client";

import { useState } from "react";

type FoodItem = {
  id: number;
  name: string;
  bookings: number;
  predicted: number;
  prepared: number;
};

const initialFood: FoodItem[] = [
  { id: 1, name: "Veg Meals", bookings: 120, predicted: 140, prepared: 0 },
  { id: 2, name: "Curd Rice", bookings: 85, predicted: 100, prepared: 0 },
  { id: 3, name: "Idli & Sambar", bookings: 65, predicted: 80, prepared: 0 },
  { id: 4, name: "Lemon Rice", bookings: 45, predicted: 60, prepared: 0 },
];

export default function ProductionPage() {
  const [food, setFood] = useState(initialFood);

  function updatePrepared(id: number, value: number) {
    setFood((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, prepared: Math.max(0, Math.min(value, 10000)) }
          : item
      )
    );
  }

  const totalBookings = food.reduce((sum, item) => sum + item.bookings, 0);
  const totalPrepared = food.reduce((sum, item) => sum + item.prepared, 0);
  const totalPredicted = food.reduce((sum, item) => sum + item.predicted, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold">🌱 FoodWise</h1>
        <p className="text-slate-400 text-sm mt-2 mb-8">Kitchen Admin</p>

        <nav className="space-y-2">
          <a href="/kitchen-admin/dashboard" className="block p-3 rounded-lg hover:bg-slate-700">📊 Dashboard</a>
          <a href="/kitchen-admin/menu" className="block p-3 rounded-lg hover:bg-slate-700">🍽️ Menu Management</a>
          <a href="/kitchen-admin/orders" className="block p-3 rounded-lg hover:bg-slate-700">📦 Orders</a>
          <a href="/kitchen-admin/demand" className="block p-3 rounded-lg hover:bg-slate-700">📈 Demand Prediction</a>
          <a href="/kitchen-admin/production" className="block p-3 rounded-lg bg-green-700">👩‍🍳 Production</a>
          <a href="/kitchen-admin/login" className="block p-3 rounded-lg hover:bg-slate-700">↩ Sign Out</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Production Planning
            </h2>
            <p className="text-slate-500 mt-2">
              Plan and monitor daily food preparation.
            </p>
          </div>

          <a
            href="/kitchen-admin/dashboard"
            className="bg-white border px-4 py-2 rounded-lg hover:bg-slate-100"
          >
            ← Dashboard
          </a>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-slate-500">Total Bookings</p>
            <h3 className="text-3xl font-bold mt-2">{totalBookings}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-slate-500">Predicted Demand</p>
            <h3 className="text-3xl font-bold mt-2">{totalPredicted}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <p className="text-slate-500">Prepared Portions</p>
            <h3 className="text-3xl font-bold mt-2">{totalPrepared}</h3>
          </div>

        </div>

        {/* Production Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-slate-800">
              Today's Production Plan
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Enter the actual number of portions prepared by the kitchen.
            </p>
          </div>

          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-4">Food Item</th>
                <th className="p-4">Bookings</th>
                <th className="p-4">Predicted</th>
                <th className="p-4">Prepared Portions</th>
                <th className="p-4">Remaining / Shortfall</th>
              </tr>
            </thead>

            <tbody>
              {food.map((item) => {
                const difference = item.prepared - item.bookings;

                return (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">{item.bookings}</td>
                    <td className="p-4">{item.predicted}</td>

                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        value={item.prepared}
                        onChange={(e) =>
                          updatePrepared(item.id, Number(e.target.value))
                        }
                        className="w-24 border rounded-lg p-2"
                      />
                    </td>

                    <td className="p-4">
                      {item.prepared === 0 ? (
                        <span className="text-slate-500">Not entered</span>
                      ) : difference >= 0 ? (
                        <span className="text-green-700 font-medium">
                          {difference} extra
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          {Math.abs(difference)} short
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        {/* Production Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <div className="flex justify-between mb-3">
            <h3 className="text-lg font-bold">Production Progress</h3>
            <span className="font-semibold text-green-700">
              {totalPrepared} / {totalPredicted}
            </span>
          </div>

          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all"
              style={{
                width: `${Math.min((totalPrepared / totalPredicted) * 100, 100)}%`,
              }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-3">
            {totalPrepared >= totalPredicted
              ? "The predicted preparation target has been reached."
              : `${totalPredicted - totalPrepared} more portions to reach the predicted target.`}
          </p>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-900">
            💡 Kitchen Recommendation
          </h3>
          <p className="text-green-800 text-sm mt-2">
            Prepare food according to bookings and predicted demand.
            Monitor preparation quantities to reduce excess food and shortages.
          </p>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          Demonstration data only. Production quantities are temporary and are
          not saved to the database yet.
        </p>

      </main>
    </div>
  );
}