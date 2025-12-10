import Link from "next/link";

export default function Button({ href, children, type = "primary", onClick }) {
  const baseClasses = "px-6 py-3 rounded-md font-semibold shadow transition";

  const styles = {
    primary: "bg-yellow-400 text-green-900 hover:opacity-95",
    secondary: "border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900",
  };

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${styles[type]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${styles[type]}`}>
      {children}
    </button>
  );
}
