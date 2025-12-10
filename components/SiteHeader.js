import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center text-white">
        <nav className="space-x-6 font-medium">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <Link href="/tasks" className="hover:text-yellow-400">Tasks</Link>
          <Link href="/contact" className="hover:text-yellow-400">Contact Us</Link>
          <Link href="/login" className="hover:text-yellow-400">Login</Link>
        </nav>
      </div>
    </header>
  );
}
