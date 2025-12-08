"use client";
import { useState } from "react";
import tasksData from "../tasks.json";

export const filters = [
  { label: "All Tasks", value: "all" },
  { label: "Online", value: "Online" },
  { label: "Local", value: "Local" },
  { label: "Kids", value: "Kids" },
  { label: "Writing", value: "Writing" },
  { label: "Design", value: "Design" },
  { label: "Tech", value: "Tech" },
  { label: "Marketing", value: "Marketing" },
  { label: "Media", value: "Media" },
  { label: "Research", value: "Research" }
];

const categoryColors = {
  Design: "bg-yellow-400 text-green-800",
  Media: "bg-green-800 text-yellow-400",
  Writing: "bg-yellow-400 text-green-800",
  Research: "bg-green-800 text-yellow-400",
  Tech: "bg-yellow-400 text-green-800",
  Marketing: "bg-green-800 text-yellow-400",
  Local: "bg-yellow-400 text-green-800",
  Online: "bg-green-800 text-yellow-400",
  Kids: "bg-yellow-400 text-green-800"
};

export default function TasksPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTasks =
    selectedFilter === "all"
      ? tasksData
      : tasksData.filter((task) => task.category === selectedFilter);

  return (
    <div className="relative min-h-screen p-8">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-900">
          Voluntr Tasks
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`px-4 py-2 rounded font-medium transition ${
                selectedFilter === filter.value
                  ? "bg-green-900 text-yellow-400"
                  : "bg-yellow-400 text-green-900 hover:bg-green-900 hover:text-yellow-400"
              }`}
              onClick={() => setSelectedFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-lg shadow-md border ${categoryColors[task.category]}`}
            >
              <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>

              <p className="text-white mb-1">
                <span className="font-medium">Category:</span> {task.category}
              </p>

              <p className="text-white mb-1">
                <span className="font-medium">Duration:</span> {task.duration} min
              </p>

              <p className="text-white mt-2">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
