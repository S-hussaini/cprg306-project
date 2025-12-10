"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <p className="text-xl mb-2">
        Name: {user.displayName || "No Name Provided"}
      </p>
      <p className="text-xl">Email: {user.email}</p>
      <p className="text-xl">Username: {user.email.split("@")[0]}</p>
    </div>
  );
}
