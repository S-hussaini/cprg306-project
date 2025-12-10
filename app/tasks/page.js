"use client";
import { useState, useEffect } from "react";
import TaskCard from "../../components/TaskCard"; 
import PageHeader from "../../components/SiteHeader";
import Button from "../../components/Button";
import { db, collection, getDocs } from "../../lib/firebase";

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

export default function TasksPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCol = collection(db, "tasks");
        const tasksSnapshot = await getDocs(tasksCol);
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasksData(tasksList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks =
    selectedFilter === "all"
      ? tasksData
      : tasksData.filter((task) => task.category === selectedFilter);

  if (loading) return <p className="text-white text-center mt-10">Loading tasks...</p>;

  return (
    <div className="relative min-h-screen p-8">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pic.png')" }} />
      <div className="absolute inset-0 bg-black/60"></div>

      <PageHeader />

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Voluntr Tasks</h1>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              type={selectedFilter === filter.value ? "primary" : "secondary"}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
