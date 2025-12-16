"use client";

import { useState, useEffect } from "react";
import PageHeader from "../../components/SiteHeader";

const MAX_CHARS = 500;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Auto-hide confirmation after 3 seconds
  useEffect(() => {
    if (!sent) return;

    const timer = setTimeout(() => {
      setSent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [sent]);

  const handleSend = () => {
    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    setError("");
    setSent(true);

    // Clear form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <PageHeader />

      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
            Contact Us
          </h1>

          <p className="text-gray-600 text-center mb-6">
            Have questions or want to collaborate? We’d love to hear from you.
          </p>

          {sent ? (
            /* Confirmation */
            <div className="text-center py-10">
              <div className="text-green-600 text-lg font-semibold mb-2">
                Message Sent Successfully
              </div>
              <p className="text-gray-600">
                Thank you for reaching out. We’ll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {error}
                </p>
              )}

              {/* Form */}
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message ({message.length} / {MAX_CHARS})
                  </label>
                  <textarea
                    rows="4"
                    maxLength={MAX_CHARS}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={handleSend}
                  className="w-full py-3 bg-yellow-400 text-green-900 font-semibold rounded-md shadow hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
