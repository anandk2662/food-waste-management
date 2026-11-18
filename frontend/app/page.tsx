export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8f5] text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌱</span>
          <span className="text-xl font-bold text-green-800">
            FoodWise
          </span>
        </div>

        <span className="text-sm text-gray-500">
          Smart Food Management
        </span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">🍽️</div>

        <h1 className="text-4xl md:text-5xl font-bold text-green-900">
          Smarter Meals.
          <br />
          Less Food Waste.
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg">
          A smart canteen management system that helps students
          pre-book meals, helps kitchens plan food production
          and reduces unnecessary food waste.
        </p>
      </section>

      {/* Portal Selection */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Choose Your Portal
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Student Portal */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-green-100">
            <div className="text-5xl mb-5">🎓</div>

            <h3 className="text-2xl font-bold text-green-800">
              Student Portal
            </h3>

            <p className="mt-4 text-gray-600 leading-7">
              Explore the menu, pre-book meals, manage your
              pickups and share feedback about your canteen experience.
            </p>

            <a
              href="/login"
              className="inline-block mt-7 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
            >
              Student Login →
            </a>
          </div>

          {/* Kitchen Admin */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-orange-100">
            <div className="text-5xl mb-5">👩‍🍳</div>

            <h3 className="text-2xl font-bold text-orange-800">
              Kitchen Admin Portal
            </h3>

            <p className="mt-4 text-gray-600 leading-7">
              Manage food menus, monitor orders, plan kitchen
              production and track food waste efficiently.
            </p>

            <a
              href="/kitchen-admin/login"
              className="inline-block mt-7 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition"
            >
              Kitchen Admin Login →
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white text-center py-6">
        <p className="text-sm">
          FoodWise | Smart Canteen & Food Waste Management
        </p>
      </footer>
    </main>
  );
}