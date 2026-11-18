export default function KitchenAdminLogin() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">

        {/* Logo and Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
            🍃
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Kitchen Admin
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Food Waste Management System
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome Back!
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your canteen operations.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Admin Email
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="accent-emerald-600" />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-emerald-700 hover:text-emerald-900"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-200 pt-5 text-center">
          <p className="text-xs text-slate-500">
            Authorized kitchen personnel only
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Demand-Aware Food Service & Waste Management
          </p>
        </div>

      </div>
    </main>
  );
}