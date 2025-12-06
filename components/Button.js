export function SimpleButton({
  displayText = "Click me",
  eventHandler,
  // not awesome because 1 color added will override all of this
  colors = "bg-black text-white hover:bg-blue-800",
}) {
  return (
    <button
      onClick={eventHandler}
      className={`${colors} py-4 px-12 my-4 bg-orange-500 rounded-full transition ease-linear duration-150 cursor-pointer `}
    >
      {displayText}
    </button>
  );
}

export function AppButton({ text, onClick, variant = "primary" }) {
  const variants = {
    primary:
      "bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 hover:dark:bg-orange-700",
    secondary:
      "bg-gray-500 hover:bg-gray-700 dark:bg-gray-600 hover:dark:bg-gray-800",
    outline: "",
  };
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]}  px-4 py-2 rounded-full cursor-pointer`}
    >
      {text}
    </button>
  );
}
