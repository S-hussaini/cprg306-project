import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}

      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header/Navbar */}
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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Small Tasks, <span className="text-yellow-400">Big Impact</span>
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl drop-shadow-lg mb-6">
          Voluntr connects you to short, meaningful volunteer tasks you can do online or nearby — perfect for busy schedules.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/tasks"
            className="px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-md shadow hover:opacity-95 transition"
          >
            Browse Tasks
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-green-900 transition"
          >
            Create Account
          </Link>
        </div>
      </main>
    </div>
  );
}
