"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-1 text-green-900">
            Welcome Back
          </h1>
          <p className="text-center text-gray-700 mb-8">
            Login to continue.
          </p>

          <form className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Email</span>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Password</span>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
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

            <p className="text-center text-gray-700 pt-1">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-green-700 underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
