"use client";

import { useState } from "react";

type FoodItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  available: boolean;
};

const initialItems: FoodItem[] = [
  { id: 1, name: "Veg Meals", category: "Lunch", price: 60, quantity: 85, available: true },
  { id: 2, name: "Curd Rice", category: "Lunch", price: 35, quantity: 42, available: true },
  { id: 3, name: "Idli & Sambar", category: "Breakfast", price: 30, quantity: 50, available: true },
  { id: 4, name: "Lemon Rice", category: "Lunch", price: 40, quantity: 35, available: false },
  { id: 5, name: "Tea", category: "Beverages", price: 10, quantity: 100, available: true },
];

export default function MenuManagement() {
  const [items, setItems] = useState<FoodItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function resetForm() {
    setName("");
    setCategory("Breakfast");
    setPrice("");
    setQuantity("");
    setEditingId(null);
    setShowForm(false);
  }

  function saveItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newItem: FoodItem = {
      id: editingId ?? Date.now(),
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      available: true,
    };

    if (editingId !== null) {
      setItems((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, ...newItem, available: item.available }
            : item
        )
      );
    } else {
      setItems((previous) => [...previous, newItem]);
    }

    resetForm();
  }

  function editItem(item: FoodItem) {
    setName(item.name);
    setCategory(item.category);
    setPrice(String(item.price));
    setQuantity(String(item.quantity));
    setEditingId(item.id);
    setShowForm(true);
  }

  function deleteItem(id: number) {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      setItems((previous) => previous.filter((item) => item.id !== id));
    }
  }

  function toggleAvailability(id: number) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/kitchen-admin/dashboard" className="text-sm text-emerald-700">
              ← Back to Dashboard
            </a>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Menu Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Add, update and manage your canteen food items.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            + Add Food Item
          </button>
        </header>

        {/* Summary Cards */}
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Food Items</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {items.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Available Items</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {items.filter((item) => item.available).length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unavailable Items</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {items.filter((item) => !item.available).length}
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="mb-5 rounded-xl bg-white p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search food items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
          />
        </section>

        {/* Add/Edit Form */}
        {showForm && (
          <section className="mb-7 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              {editingId !== null ? "Edit Food Item" : "Add New Food Item"}
            </h2>

            <form onSubmit={saveItem} className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Food Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Example: Veg Meals"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-600"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Snacks</option>
                  <option>Dinner</option>
                  <option>Beverages</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Available Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
                >
                  {editingId !== null ? "Update Item" : "Save Item"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Food Items Table */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Food Items
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Food Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="p-4 font-semibold text-slate-800">
                      {item.name}
                    </td>
                    <td className="p-4 text-slate-600">{item.category}</td>
                    <td className="p-4 text-slate-700">₹{item.price}</td>
                    <td className="p-4 text-slate-700">{item.quantity}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.available
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => editItem(item)}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No food items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          FoodWise · Kitchen Menu Management
        </p>

      </div>
    </main>
  );
}