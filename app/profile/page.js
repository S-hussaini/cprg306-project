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
          setProfileData(snap.docs[0].data()); 
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
  // Fetch volunteer tasks
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
            <strong>Availability:</strong>
            <br />
            {profileData?.availability && profileData.availability.length > 0 ? (
              profileData.availability
                .sort()
                .map((dateStr) => {
                  const date = new Date(dateStr);
                  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
                  const formattedDate = date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <span key={dateStr} className="block">
                      {weekday}: {formattedDate}
                    </span>
                  );
                })
            ) : (
              "No availability info"
            )}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button text="Update Profile Details" onClick={() => router.push("/profile/editProfile")}>
              Update Profile Details
            </Button>
          </div>
        </div>

       
      </div>
    </div>
  );
}
