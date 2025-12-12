"use client";
import Link from "next/link";
import { useUserAuth } from "../lib/auth-context";

export default function PageHeader() {
  const{ user, firebaseSignOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center text-white">
        <nav className="space-x-6 font-medium">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <Link href="/tasks" className="hover:text-yellow-400">Tasks</Link>
          <Link href="/contact" className="hover:text-yellow-400">Contact Us</Link>

          {!user && (
            <Link href="/login" className="hover:text-yellow-400">Login</Link>
          )}
          {user && (
            <>
              <Link href="/profile" className="hover:text-yellow-400">Profile</Link>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-400"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
