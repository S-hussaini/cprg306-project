"use client"; // enables interactivity in app folder
import { useState } from "react";
import tasksData from "../tasks.json";

// Filter options
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

// Category colors matching homepage
const categoryColors = {
  Design: "bg-yellow-400 text-green-900",
  Media: "bg-green-900 text-yellow-400",
  Writing: "bg-yellow-400 text-green-900",
  Research: "bg-green-900 text-yellow-400",
  Tech: "bg-yellow-400 text-green-900",
  Marketing: "bg-green-900 text-yellow-400",
  Local: "bg-yellow-400 text-green-900",
  Online: "bg-green-900 text-yellow-400",
  Kids: "bg-yellow-400 text-green-900"
};

export default function TasksPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter tasks based on selection
  const filteredTasks =
    selectedFilter === "all"
      ? tasksData
      : tasksData.filter((task) => task.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Available Tasks</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`px-4 py-2 rounded font-medium transition ${
              selectedFilter === filter.value
                ? "bg-green-900 text-yellow-400"
                : "bg-yellow-400 text-black hover:bg-green-900 hover:text-yellow-400"
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
  );
}
