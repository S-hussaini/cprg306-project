// components/TaskCard.js
import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h4 className="font-semibold">{task.title}</h4>
      <div className="text-xs text-gray-500 mt-1">{task.category} • {task.timeMinutes ?? "—"} min</div>
      <p className="text-sm text-gray-700 mt-2 line-clamp-3">{task.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <Link href={`/tasks/${task.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
        <div className="text-sm text-gray-500">{task.points} pts</div>
      </div>
    </div>
  );
}
