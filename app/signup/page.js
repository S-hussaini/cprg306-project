"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email / Password signup
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email: user.email,
        provider: "password",
        createdAt: serverTimestamp(),
      });

      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GitHub signup/login
  const handleGithubSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if Firestore user document exists
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email: user.email,
          provider: "github",
          createdAt: serverTimestamp(),
        });
      }

      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Create Your Account
        </h1>

        {/* EMAIL / PASSWORD FORM */}
        <form
          onSubmit={handleEmailSignup}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md text-left mb-4"
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
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="flex items-center w-full max-w-md mb-4">
          <hr className="grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* GITHUB SIGNUP */}
        <button
          onClick={handleGithubSignup}
          className="w-full max-w-md py-3 bg-black text-white font-semibold rounded-md shadow hover:opacity-95 transition mb-4"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Continue with GitHub"}
        </button>

        <p className="text-center text-gray-700 pt-2">
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
