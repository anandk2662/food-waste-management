const stats = [
  {
    title: "Pre-booked Meals",
    value: "248",
    subtitle: "Student reservations",
    icon: "📋",
  },
  {
    title: "Meals Prepared",
    value: "220",
    subtitle: "89% of bookings",
    icon: "🍱",
  },
  {
    title: "Meals Collected",
    value: "186",
    subtitle: "75% of bookings",
    icon: "✅",
  },
  {
    title: "Remaining Meals",
    value: "34",
    subtitle: "Awaiting collection",
    icon: "⏳",
  },
];

const activities = [
  { name: "Veg Meals", quantity: "85 plates", status: "Ready" },
  { name: "Curd Rice", quantity: "42 plates", status: "Preparing" },
  { name: "Chapati & Curry", quantity: "60 plates", status: "Ready" },
  { name: "Lemon Rice", quantity: "35 plates", status: "Collected" },
];

const navigation = [
  ["📊", "Dashboard", "/kitchen-admin/dashboard"],
  ["🍽️", "Menu Management", "/kitchen-admin/menu"],
  ["📋", "Orders", "/kitchen-admin/orders"],
  ["📈", "Demand Prediction", "/kitchen-admin/demand"],
  ["👨‍🍳", "Production", "/kitchen-admin/production"],
  ["🎫", "Pickup Management", "/kitchen-admin/pickup"],
  ["♻️", "Waste Management", "/kitchen-admin/waste"],
  ["🤝", "Redistribution", "/kitchen-admin/redistribution"],
  ["⭐", "Feedback", "/kitchen-admin/feedback"],
  ["📉", "Analytics", "/kitchen-admin/analytics"],
];

export default function KitchenDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">

      {/* Sidebar */}
      <aside className="w-full bg-slate-950 p-5 text-white md:min-h-screen md:w-64">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-3 text-2xl">
            🍃
          </div>
          <div>
            <h1 className="text-lg font-bold">FoodWise</h1>
            <p className="text-xs text-slate-400">Kitchen Admin</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-1">
          {navigation.map(([icon, name, link]) => (
            <a
              key={name}
              href={link}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                name === "Dashboard"
                  ? "bg-emerald-700 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{icon}</span>
              {name}
            </a>
          ))}
        </nav>

        <div className="mt-8 border-t border-slate-800 pt-5">
          <a
            href="/kitchen-admin/login"
            className="block rounded-lg px-3 py-3 text-sm text-red-300 hover:bg-slate-800"
          >
            ↪ Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8">

        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Kitchen Administration / Overview
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monitor your canteen operations and food demand.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-500">Today's Overview</p>
            <p className="font-semibold text-slate-800">Canteen Operations</p>
          </div>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>
                <span className="rounded-xl bg-emerald-50 p-3 text-2xl">
                  {item.icon}
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {item.subtitle}
              </p>
            </div>
          ))}
        </section>

        {/* Charts and Summary */}
        <section className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Demand vs Production */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
            <h3 className="text-lg font-bold text-slate-900">
              Demand vs Production
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Sample meal quantities for today's operations
            </p>

            <div className="mt-8 space-y-6">
              {[
                { name: "Breakfast", demand: 75, production: 65 },
                { name: "Lunch", demand: 95, production: 85 },
                { name: "Snacks", demand: 55, production: 45 },
                { name: "Dinner", demand: 70, production: 60 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.name}
                    </span>
                    <span className="text-slate-500">
                      Demand: {item.demand} | Prepared: {item.production}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600"
                        style={{ width: `${item.demand}%` }}
                      />
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${item.production}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-xs text-slate-600">
              <span>🟢 Demand</span>
              <span>🟡 Production</span>
            </div>
          </div>

          {/* Food Outcome */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Food Outcome
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Prepared meal distribution
            </p>

            <div className="my-8 text-center">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[14px] border-emerald-500">
                <div>
                  <p className="text-3xl font-bold text-slate-900">220</p>
                  <p className="text-xs text-slate-500">Prepared</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Collected</span>
                <strong>186</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Awaiting pickup</span>
                <strong>34</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Redistributed</span>
                <strong>0</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Kitchen Production Summary
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Today's food preparation status
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Sample Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3">Food Item</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {activities.map((item) => (
                  <tr key={item.name} className="border-b border-slate-100">
                    <td className="py-4 font-medium text-slate-800">
                      {item.name}
                    </td>
                    <td className="py-4 text-slate-600">
                      {item.quantity}
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-slate-400">
          FoodWise · Demand-Aware Food Service and Waste Management System
        </footer>

      </main>
    </div>
  );
}