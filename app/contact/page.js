"use client";
import Link from "next/link";
import PageHeader from "../../components/SiteHeader";

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <PageHeader />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-xl drop-shadow-lg mb-8">
          Have questions or want to collaborate? Send us a message below.
        </p>

        <form className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md text-left">
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Message</span>
            <textarea
              className="w-full mt-1 px-3 py-2 border rounded-md h-28"
              required
            ></textarea>
          </label>

          <button
  type="button"
  onClick={() => alert("Your message has been sent successfully.")}
  className="w-full py-3 bg-yellow-400 text-green-900 font-semibold rounded-md shadow hover:opacity-95 transition"
>
  Send Message
</button>

        </form>
      </main>
    </div>
  );
}
