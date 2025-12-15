"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useParams, useRouter } from "next/navigation";
import { useUserAuth } from "../../../lib/auth-context";

export default function TaskDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const { user, loading: authLoading } = useUserAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [volunteering, setVolunteering] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Task id is missing from the URL.");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTask({ id: docSnap.id, ...docSnap.data() });
          return;
        }

        const snapshot = await getDocs(collection(db, "tasks"));
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        const found = docs.find(d =>
          d.id === id ||
          d.slug === id ||
          (d.title &&
            d.title.toLowerCase().replace(/\s+/g, "-") ===
              id.toLowerCase())
        );

        if (found) {
          setTask(found);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task.");
      } finally {
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

    if (!task) return;

    setVolunteering(true);

    try {
      const volunteerId = `${task.id}_${user.uid}`;

      await setDoc(
        doc(db, "volunteers", volunteerId),
        {
          taskId: task.id,
          userId: user.uid,
          email: user.email,
          volunteeredAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("You successfully volunteered for this task!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Volunteer error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setVolunteering(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        <p>Loading task...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center mt-10">
        <p>{error}</p>
      </div>
    );
  }

  if (notFound || !task) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-2xl font-semibold">Task not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen text-white relative ">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-2xl mx-auto bg-amber-50 border-2 border-amber-500 rounded-xl p-6 shadow-lg my-40 px-10">
  <h1 className="text-3xl font-bold mb-4 text-black">{task.title}</h1>

  <p className="text-lg mb-3 text-black">{task.description}</p>

  <p className="mb-2 text-black">
    <strong>Category:</strong> {task.category}
  </p>

  <p className="mb-6 text-black">
    <strong>Points:</strong> {task.points}
  </p>

  <div className="flex gap-4">
    {user ? (
      <>
        <button
          onClick={handleVolunteer}
          disabled={volunteering}
          className="bg-green-600 px-6 py-3 rounded-lg disabled:opacity-50 "
        >
          {volunteering ? "Saving..." : "Volunteer for this Task"}
        </button>
      </>
    ) : (
      !authLoading && (
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Login to Volunteer
        </button>
      )
    )}
  </div>
</div>

    </div>
  );
}
