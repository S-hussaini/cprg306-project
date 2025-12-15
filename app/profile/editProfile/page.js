"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../../lib/auth-context";
import { db } from "../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import PageHeader from "@/components/SiteHeader";
import Button from "@/components/Button";

export default function EditProfile() {
  const { user, loading } = useUserAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");

  // calendar availability
  const [availabilityDates, setAvailabilityDates] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  const [userDocId, setUserDocId] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  // Load existing profile
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docSnap = snap.docs[0];
        const data = docSnap.data();

        setUserDocId(docSnap.id);
        setFullName(data.fullName || "");
        setBio(data.bio || "");
        setPhone(data.phone || "");
        setAvailabilityDates(data.availability || []);
      }

      setLoadingProfile(false);
    };

    loadProfile();
  }, [user]);

  // Add availability date
  const addDate = () => {
    if (!selectedDate) return;

    if (!availabilityDates.includes(selectedDate)) {
      setAvailabilityDates([...availabilityDates, selectedDate]);
    }

    setSelectedDate("");
  };

  // Format date display
  const formatDate = (dateStr) => {

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Save profile
  const handleSave = async () => {
    if (!userDocId) return;

    setSaving(true);

    try {
      await updateDoc(doc(db, "users", userDocId), {
        fullName,
        bio,
        phone,
        availability: availabilityDates,
        updatedAt: new Date(),
      });

      router.push("/profile");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingProfile) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <PageHeader />

      <div className="relative z-10 max-w-2xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Edit Profile
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          {/* Full Name */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="font-semibold">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

        {/* Availability Calendar */}
<div>
  <label className="font-semibold">Availability</label>

  <div className="flex gap-2 mt-1">
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="flex-1 border rounded px-3 py-2"
    />

    <button
      type="button"
      onClick={() => {
        if (!selectedDate) return;

        setAvailabilityDates((prev) => {
          if (prev.includes(selectedDate)) return prev;
          return [...prev, selectedDate].sort();
        });

        setSelectedDate("");
      }}
      className="px-4 py-2 bg-yellow-400 rounded font-semibold"
    >
      Add
    </button>
  </div>

  {availabilityDates.length > 0 && (
    <div className="mt-4 space-y-2">
      {availabilityDates.map((date) => (
        <div
          key={date}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
        >
          <span className="text-sm font-medium">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

          <button
            type="button"
            onClick={() =>
              setAvailabilityDates((prev) =>
                prev.filter((d) => d !== date)
              )
            }
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>


         <div className="flex gap-4 mt-6">
            <Button
            text={saving ? "Saving..." : "Save Changes"}
            onClick={handleSave}
            disabled={saving}>
            Save Changes
          </Button>
          <Button
            text="Cancel"
            onClick={() => router.push("/profile")}
            variant="secondary">
            Cancel
          </Button>
          <Button
              text="Change Password"
              onClick={() => router.push("/profile/changePassword")}
              variant="tertiary"
            >
              Change Password
            </Button>
          </div>
 
        </div>
      </div>
    </div>
  );
}
