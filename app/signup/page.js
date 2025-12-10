"use client";

import { useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        createdAt: new Date(),
      });

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <header className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center text-white">
          <nav className="space-x-6 font-medium">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="/tasks" className="hover:text-yellow-400">Tasks</Link>
            <Link href="/contact" className="hover:text-yellow-400">Contact Us</Link>
            <Link href="/signup" className="hover:text-yellow-400">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Create Your Account
        </h1>

        <p className="text-lg sm:text-xl text-white mb-8 drop-shadow-lg max-w-xl">
          Join Voluntr and start making a difference today.
        </p>

        <form
          onSubmit={handleSignup}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md text-left"
        >
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-green-900 font-semibold rounded-md shadow hover:opacity-95 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-green-700 underline">
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
