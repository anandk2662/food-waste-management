"use client";

import { useState } from "react";

type Feedback = {
  id: number;
  student: string;
  food: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
};

export default function FeedbackPage() {
  const [feedbacks] = useState<Feedback[]>([
    { id: 1, student: "Rahul", food: "Veg Meals", rating: 5, category: "Food Quality", comment: "Very tasty and fresh food.", date: "18 Nov 2026" },
    { id: 2, student: "Priya", food: "Curd Rice", rating: 4, category: "Taste", comment: "Good taste and quantity.", date: "18 Nov 2026" },
    { id: 3, student: "Arjun", food: "Idli & Sambar", rating: 3, category: "Service", comment: "Food was good but waiting time was long.", date: "18 Nov 2026" },
    { id: 4, student: "Sneha", food: "Lemon Rice", rating: 2, category: "Food Quality", comment: "Food was a little cold.", date: "17 Nov 2026" },
    { id: 5, student: "Kiran", food: "Veg Meals", rating: 5, category: "Taste", comment: "Excellent meal. Loved it!", date: "17 Nov 2026" },
    { id: 6, student: "Ananya", food: "Curd Rice", rating: 4, category: "Quantity", comment: "Good food and sufficient quantity.", date: "17 Nov 2026" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const averageRating =
    feedbacks.length === 0
      ? 0
      : feedbacks.reduce((sum, item) => sum + item.rating, 0) /
        feedbacks.length;

  const positive = feedbacks.filter((item) => item.rating >= 4).length;
  const negative = feedbacks.filter((item) => item.rating <= 2).length;

  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesSearch =
      item.student.toLowerCase().includes(search.toLowerCase()) ||
      item.food.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Positive" && item.rating >= 4) ||
      (filter === "Average" && item.rating === 3) ||
      (filter === "Negative" && item.rating <= 2);

    return matchesSearch && matchesFilter;
  });

  const ratingCount = (rating: number) =>
    feedbacks.filter((item) => item.rating === rating).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            KITCHEN ADMIN / FEEDBACK
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Feedback & Ratings
          </h1>
          <p className="mt-2 text-gray-500">
            Understand student satisfaction and improve canteen services.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Average Rating</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {averageRating.toFixed(1)} / 5
            </h2>
            <p className="mt-1 text-sm text-yellow-500">★ ★ ★ ★ ★</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Feedback</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {feedbacks.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Positive Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {positive}
            </h2>
            <p className="mt-1 text-xs text-gray-400">4 or 5 stars</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Needs Improvement</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {negative}
            </h2>
            <p className="mt-1 text-xs text-gray-400">1 or 2 stars</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Rating Distribution
          </h2>

          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCount(rating);
              const percentage =
                feedbacks.length === 0
                  ? 0
                  : (count / feedbacks.length) * 100;

              return (
                <div key={rating} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-semibold text-gray-700">
                    {rating} ★
                  </span>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-sm text-gray-500">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 md:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, food or comment..."
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:border-green-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-3 text-gray-700"
          >
            <option value="All">All Feedback</option>
            <option value="Positive">Positive (4–5 stars)</option>
            <option value="Average">Average (3 stars)</option>
            <option value="Negative">Negative (1–2 stars)</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-xl font-bold text-gray-800">
              Student Reviews
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Feedback received about food and service.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFeedbacks.map((item) => (
              <div key={item.id} className="p-5 hover:bg-gray-50">
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {item.student}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.food} · {item.category}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="font-semibold text-yellow-500">
                      {"★".repeat(item.rating)}
                      <span className="text-gray-200">
                        {"★".repeat(5 - item.rating)}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  "{item.comment}"
                </p>
              </div>
            ))}

            {filteredFeedbacks.length === 0 && (
              <p className="p-10 text-center text-gray-500">
                No feedback found.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
          <h3 className="font-bold text-green-800">
            Improvement Suggestion
          </h3>
          <p className="mt-1 text-sm text-green-700">
            Review low-rated food items and student comments regularly.
            Use this feedback to improve food quality, taste, quantity and service.
          </p>
        </div>

      </div>
    </div>
  );
}