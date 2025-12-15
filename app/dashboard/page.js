"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../lib/auth-context";
import PageHeader from "@/components/SiteHeader";
import Button from "@/components/Button";

import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, doc, getDoc ,  setDoc, serverTimestamp } from "firebase/firestore";

export default function DashboardPage() {
  const { user, loading: authLoading } = useUserAuth();
  const router = useRouter();

  const [loadingTasks, setLoadingTasks] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchVolunteerTasks = async () => {
      setLoadingTasks(true);

      try {
        const volunteerRef = collection(db, "volunteers");
        const q = query(volunteerRef, where("userId", "==", user.uid));
        const snap = await getDocs(q);

        const upcomingList = [];
        const completedList = [];

        for (const docSnap of snap.docs) {
          const data = docSnap.data();
          const taskRef = doc(db, "tasks", data.taskId);
          const taskSnap = await getDoc(taskRef);

          if (taskSnap.exists()) {
            const taskData = { id: taskSnap.id, ...taskSnap.data() };
            if (data.status === "completed") completedList.push(taskData);
            else upcomingList.push(taskData);
          }
        }

        setUpcoming(upcomingList);
        setCompleted(completedList);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }

      setLoadingTasks(false);
    };

    fetchVolunteerTasks();
  }, [user]);

  if (authLoading) {
    return <p className="text-white text-center mt-10">Loading user...</p>;
  }

const handleComplete = async (taskId) => {
  if (!user) return;

  try {
    const volunteerDocRef = doc(db, "volunteers", `${taskId}_${user.uid}`);
    
    await setDoc(
      volunteerDocRef,
      {
        status: "completed",
        completedAt: serverTimestamp(),
      },
      { merge: true } 
    );

   
    setUpcoming((prev) => prev.filter((t) => t.id !== taskId));
    const completedTask = upcoming.find((t) => t.id === taskId);
    if (completedTask) setCompleted((prev) => [completedTask, ...prev]);

    alert("Task marked as completed!");
  } catch (err) {
    console.error("Error marking task as completed:", err);
    alert("Failed to mark task as completed. Please try again.");
  }
};

const handleMarkIncomplete = async (taskId) => {
  if (!user) return;

  try {
    const volunteerDocRef = doc(db, "volunteers", `${taskId}_${user.uid}`);

    await setDoc(
      volunteerDocRef,
      {
        status: "upcoming",
        completedAt: null,
      },
      { merge: true }
    );


    setCompleted((prev) => prev.filter((t) => t.id !== taskId));
    const revertedTask = completed.find((t) => t.id === taskId);
    if (revertedTask) setUpcoming((prev) => [revertedTask, ...prev]);

    alert("Task marked as incomplete!");
  } catch (err) {
    console.error("Error marking task as incomplete:", err);
    alert("Failed to mark task as incomplete. Please try again.");
  }
};

const totalPoints = completed.reduce(
  (sum, task) => sum + (task.points ?? 15),
  0
);



  return (
    <div className="relative min-h-screen p-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <PageHeader />

      
      <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg text-center my-5">
  Dashboard
</h1>

{/* Your Activity Section */}
<div className="relative z-10 mt-10 bg-white p-6 rounded-2xl shadow-md">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Activity</h2>

  {/* Determine reward level */}
  {(() => {
    let level = "Bronze";
    let nextLevelPoints = 50;
    if (totalPoints >= 50 && totalPoints < 100) {
      level = "Silver";
      nextLevelPoints = 100;
    } else if (totalPoints >= 100) {
      level = "Gold";
      nextLevelPoints = 100; // max level
    }
    return (
      <div>
        <p className="text-gray-700 mb-2">
          Total Points Earned: <strong>{totalPoints}</strong>
        </p>
        <p className="text-gray-800 font-semibold mb-2">
          Current Reward Level: {level}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-6 mb-2">
          <div
            className={`h-6 rounded-full transition-all duration-500 ${
              level === "Bronze"
                ? "bg-yellow-600"
                : level === "Silver"
                ? "bg-gray-500"
                : "bg-yellow-400"
            }`}
            style={{
              width: `${Math.min((totalPoints / nextLevelPoints) * 100, 100)}%`,
            }}
          />
        </div>
        {level !== "Gold" && (
          <p className="text-gray-600 text-sm mb-4">
            {Math.min(totalPoints, nextLevelPoints)} / {nextLevelPoints} points to next level
          </p>
        )}
      </div>
    );
  })()}
</div>


      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        {/* Upcoming Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Volunteer Tasks</h2>
          {loadingTasks ? (
            <p className="text-gray-700">Loading tasks...</p>
          ) : upcoming.length === 0 ? (
            <p className="text-gray-700">No upcoming tasks.</p>
          ) : (
            <div className="space-y-4">
              {upcoming.map((task) => (
                <div key={task.id} className="bg-white p-5 rounded-xl shadow">
                  <h3 className="text-xl font-semibold text-green-900">{task.title}</h3>
                  <p className="text-gray-700">{task.description}</p>
                  <p className="text-gray-600 mt-1">
                    <strong>Points:</strong> {task.points}
                  </p>
                  <div className="flex gap-4 mt-4">
  <Button onClick={() => handleComplete(task.id)}>Mark Completed</Button>

  <Button type="secondary" onClick={() => router.push(`/tasks/${task.id}`)}>View Detail</Button>
</div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Tasks</h2>
          {loadingTasks ? (
            <p className="text-gray-700">Loading tasks...</p>
          ) : completed.length === 0 ? (
            <p className="text-gray-700">No completed tasks yet.</p>
          ) : (
            <div className="space-y-4">
              {completed.map((task) => (
                <div key={task.id} className="bg-white p-5 rounded-xl shadow">
                  <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-700">{task.description}</p>
                  <p className="text-gray-600 mt-1">
                    <strong>Points Earned:</strong> {task.points}
                  </p>

                  <div className="flex gap-4 mt-4">
                     <Button onClick={() => handleMarkIncomplete(task.id)}>
  Mark Incomplete
</Button>
                    <Button type="secondary" onClick={() => router.push(`/tasks/${task.id}`)}>View Detail</Button>
                 
                  </div>
                  

                 
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
