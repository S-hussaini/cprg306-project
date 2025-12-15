"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../lib/auth-context";
import PageHeader from "@/components/SiteHeader";
import Button from "@/components/Button";

import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const { user, loading, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Redirect if NOT logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Fetch profile data from Users collection by email
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const snap = await getDocs(q);

        if (!snap.empty) {
          setProfileData(snap.docs[0].data()); // Take the first matching document
        } else {
          console.log("No user document found for this email!");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch volunteer tasks for user
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

  if (loading || !user || loadingProfile) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <PageHeader />

      <div className="relative z-10 max-w-3xl mx-auto py-10">
        {/* USER INFO */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Profile Page</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <p className="text-xl mb-2 text-gray-800">
            <strong>Name:</strong> {profileData?.fullName || "No Name Provided"}
          </p>

          <p className="text-xl mb-2 text-gray-800">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="text-xl mb-2 text-gray-800">
            <strong>Username:</strong> {user.email.split("@")[0]}
          </p>

          <p className="text-xl mb-2 text-gray-800">
            <strong>Bio:</strong> {profileData?.bio || "No bio added yet"}
          </p>

          <p className="text-xl mb-2 text-gray-800">
            <strong>Phone:</strong> {profileData?.phone || "No phone number"}
          </p>

          <p className="text-xl mb-4 text-gray-800">
            <strong>Availability:</strong> {profileData?.availability || "No availability info"}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button text="Update Profile Details" onClick={() => router.push("/profile/editProfile")}>
            Update Profile Details
            </Button>
          </div>
        </div>

        {/* TASK SECTIONS */}
        <div className="space-y-10">
          {/* UPCOMING TASKS */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
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
                    <p className="text-gray-600 mt-1"><strong>Points:</strong> {task.points}</p>
                    <Button text="View Task" onClick={() => router.push(`/tasks/${task.id}`)}>
                    View Detail
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COMPLETED TASKS */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
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
                    <p className="text-gray-600 mt-1"><strong>Points Earned:</strong> {task.points}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
