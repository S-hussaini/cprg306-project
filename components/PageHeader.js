function TextBoxButton() {
  return (
    <button className="px-4 py-2 my-4 lg:px-6 lg:py-4 bg-blue-500 font-medium text-lg w-fit rounded-full cursor-pointer transition hover:bg-blue-600 hover:shadow-lg duration-150 ease-linear">
      Page main action
    </button>
  );
}

function TextBox({
  title = "Weekly Assignment",
  description = "focus for the week",
}) {
  return (
    <div className="p-10 md:p-12 lg:p-16 flex flex-col container max-w-xl xl:max-w-2xl bg-stone-100 dark:bg-stone-800 rounded-lg">
      <h1 className="mb-2 lg:mb-4 text-5xl lg:text-6xl xl:text-7xl font-semibold lg:font-bold  dark:text-white">
        {title}
      </h1>
      <p className="text-xl lg:text-2xl">{description}</p>
      <TextBoxButton />
    </div>
  );
}
function ImagePlaceHolder() {
  return (
    <div className="container rounded-lg p-10 md:p-12 lg:p-16 max-w-xl xl:max-w-2xl">
      <h3 className="text-6xl font-bold ">
        IMAGE
        <span className="block">
          <span className="block text-blue-500">PLACE</span>
          <span className="block ">HOLDER</span>
        </span>
      </h3>
    </div>
  );
}
export default function PageHeader({ title, description }) {
  return (
    <header className="flex flex-col lg:flex-row gap-2 justify-center lg:gap-4 p-2 lg:p-8">
      <TextBox title={title} description={description} />
      <ImagePlaceHolder />
    </header>
  );
}
