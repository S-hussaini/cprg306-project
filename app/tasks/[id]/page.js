"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useParams, useRouter } from "next/navigation";
import { useUserAuth } from "../../../lib/auth-context";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useUserAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); // fetch loading
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // defensive: if id is missing, show error
    if (!id) {
      setError("Task id is missing from the URL.");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        // 1) Try direct doc read at tasks/{id}
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // If the doc exists, use it (include id)
          setTask({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }

        // 2) Fallback: maybe the Firestore document id is different.
        //    Scan the tasks collection and try to find a matching field.
        const tasksCol = collection(db, "tasks");
        const snapshot = await getDocs(tasksCol);

        // Try to match either a stored `id` field, a `slug`, or the title.
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        const found = docs.find(d =>
          d.id === id ||
          (d.id && String(d.id) === String(id)) ||
          (d.id && String(d.id).toLowerCase() === String(id).toLowerCase()) ||
          (d.slug && String(d.slug) === String(id)) ||
          (d.title && d.title.toLowerCase().replace(/\s+/g, "-") === String(id).toLowerCase())
        );

        if (found) {
          setTask(found);
          setLoading(false);
          return;
        }

        // Nothing found
        setNotFound(true);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError(err.message || "Failed to fetch task. Check console for details.");
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleVolunteer = async () => {
    if (!user) {
      router.push("/login");
      return;
    }


    alert("You volunteered for this task!");
  };

  // UI states
  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        <p>Loading task...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center mt-10">
        <p className="font-semibold mb-2">Error</p>
        <pre className="whitespace-pre-wrap text-sm">{error}</pre>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-2xl font-semibold mb-2">Task not found</p>
        <p className="text-sm">Make sure the task id in the URL is correct.</p>
      </div>
    );
  }


  return (
    <div className="p-8 min-h-screen text-white relative ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
        <p className="text-lg mb-3">{task.description}</p>

        <p className="text-md mb-2">
          <strong>Category:</strong> {task.category}
        </p>
        <p className="text-md mb-6">
          <strong>Points:</strong> {task.points}
        </p>

        {user ? (
          <button
            onClick={handleVolunteer}
            className="bg-green-600 px-6 py-3 rounded-lg text-white"
          >
            Volunteer for this Task
          </button>
        ) : (
          !authLoading && (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 px-6 py-3 rounded-lg text-white"
            >
              Login to Volunteer
            </button>
          )
        )}
      </div>
    </div>
  );
}
