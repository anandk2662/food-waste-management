const mealData = [
  { name: "Veg Meals", booked: 120, prepared: 140, collected: 110, wasted: 30 },
  { name: "Curd Rice", booked: 85, prepared: 100, collected: 80, wasted: 20 },
  { name: "Idli & Sambar", booked: 65, prepared: 80, collected: 70, wasted: 10 },
  { name: "Lemon Rice", booked: 45, prepared: 60, collected: 42, wasted: 18 },
];

const weeklyData = [
  { day: "Mon", waste: 35 },
  { day: "Tue", waste: 28 },
  { day: "Wed", waste: 40 },
  { day: "Thu", waste: 22 },
  { day: "Fri", waste: 30 },
  { day: "Sat", waste: 18 },
  { day: "Sun", waste: 25 },
];

export default function AnalyticsPage() {
  const totalBooked = mealData.reduce((sum, item) => sum + item.booked, 0);
  const totalPrepared = mealData.reduce((sum, item) => sum + item.prepared, 0);
  const totalCollected = mealData.reduce((sum, item) => sum + item.collected, 0);
  const totalWasted = mealData.reduce((sum, item) => sum + item.wasted, 0);
  const totalDonated = 25;

  const wastePercentage = (totalWasted / totalPrepared) * 100;
  const collectionPercentage = (totalCollected / totalPrepared) * 100;

  const maxWaste = Math.max(...weeklyData.map((item) => item.waste));

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-700">
              KITCHEN ADMIN / ANALYTICS
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-800">
              Analytics & Reports
            </h1>
            <p className="mt-2 text-gray-500">
              Monitor canteen performance and food waste statistics.
            </p>
          </div>

          <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Sample Daily Report
          </span>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Pre-bookings</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {totalBooked}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Student meal bookings</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Meals Prepared</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {totalPrepared}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Total portions</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Meals Collected</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {totalCollected}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Successfully collected</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Food Wasted</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {totalWasted}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Uncollected portions</p>
          </div>

        </div>

        {/* Performance Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Meal Collection Performance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Prepared portions compared with collected portions.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-600">Collected</span>
                  <span className="font-bold text-green-600">
                    {collectionPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${collectionPercentage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-600">Food Wasted</span>
                  <span className="font-bold text-red-600">
                    {wastePercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${wastePercentage}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-800">
                  Collection Summary
                </p>
                <p className="mt-1 text-sm text-green-700">
                  {totalCollected} out of {totalPrepared} prepared portions
                  were collected.
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Waste Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Weekly Food Waste
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sample leftover portions for each day.
            </p>

            <div className="mt-8 flex h-48 items-end justify-between gap-3">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">
                    {item.waste}
                  </span>
                  <div className="flex h-36 w-full items-end overflow-hidden rounded-t-md bg-gray-100">
                    <div
                      className="w-full rounded-t-md bg-orange-400"
                      style={{ height: `${(item.waste / maxWaste) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-gray-400">
              Number of wasted portions
            </p>
          </div>
        </div>

        {/* Food Item Report */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Food Item Performance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Compare bookings, preparation, collection and waste.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Food Item</th>
                  <th className="px-5 py-4">Booked</th>
                  <th className="px-5 py-4">Prepared</th>
                  <th className="px-5 py-4">Collected</th>
                  <th className="px-5 py-4">Wasted</th>
                  <th className="px-5 py-4">Waste %</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {mealData.map((item) => {
                  const percentage = (item.wasted / item.prepared) * 100;

                  return (
                    <tr key={item.name} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.booked}</td>
                      <td className="px-5 py-4 text-gray-600">{item.prepared}</td>
                      <td className="px-5 py-4 text-green-700">{item.collected}</td>
                      <td className="px-5 py-4 font-semibold text-red-600">
                        {item.wasted}
                      </td>
                      <td className="px-5 py-4">
                        <span className={percentage > 20 ? "font-semibold text-red-600" : "font-semibold text-green-600"}>
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

        {/* Redistribution */}
        <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-800">
            Food Redistribution Summary
          </h2>

          <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-green-700">
                Sample surplus portions recorded as donated
              </p>
              <h3 className="mt-1 text-3xl font-bold text-green-800">
                {totalDonated} Portions
              </h3>
            </div>

            <div className="rounded-xl bg-white px-5 py-3">
              <p className="text-xs text-gray-500">Donation Status</p>
              <p className="mt-1 font-bold text-green-700">Sample Report</p>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Admin Recommendations
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>• Compare daily bookings with actual meal collection.</li>
            <li>• Reduce preparation of food items with consistently high leftovers.</li>
            <li>• Use demand predictions to plan the next day's production.</li>
            <li>• Record safe surplus food donations to reduce avoidable waste.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}