"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "../../components/SiteHeader";
import { auth, githubProvider } from "../../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/profile");
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
      <PageHeader />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-1 text-green-900">
            Welcome Back
          </h1>
          <p className="text-center text-gray-700 mb-8">Login to continue.</p>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Password</span>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white font-semibold rounded-md shadow hover:opacity-90 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.932 0-1.31.467-2.382 1.235-3.222-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23.955-.265 1.98-.397 3-.403 1.02.006 2.045.138 3 .403 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.912 1.23 3.222 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.096.815 2.21v3.277c0 .317.21.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Log in with GitHub
            </button>
          </div>

          <p className="text-center text-gray-700 pt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-700 underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
