import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-ful bg-gray-100 py-8 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Project Info */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Voluntr - Web Dev 2 Project
          </h3>
          <p className="text-black text-sm">
            Student project by Software Development students at SAIT, 2025.
          </p>
        </div>

        {/* Social / Credits */}
        <div className="flex flex-col items-start md:items-end space-y-1">
          <p className="text-black  text-sm">
            &copy; SAIT 2025
          </p>
          <p className="text-black text-xs">
            All rights reserved. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
