"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../lib/auth-context";

export default function Profile() {
  const { user, loading, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // redirect to homepage if not logged in
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push("/"); // redirect to homepage after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading || !user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <p className="text-xl mb-2">
        Name: {user.displayName || "No Name Provided"}
      </p>
      <p className="text-xl mb-2">Email: {user.email}</p>
      <p className="text-xl mb-6">
        Username: {user.email ? user.email.split("@")[0] : "N/A"}
      </p>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
