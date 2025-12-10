import PageHeader from "../components/SiteHeader";
import Button from "../components/Button";
import SiteFooter from "../components/SiteFooter";
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />

      <div className="absolute inset-0 bg-black/60"></div>
      <PageHeader />
      
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Small Tasks, <span className="text-yellow-400">Big Impact</span>
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl drop-shadow-lg mb-6">
          Voluntr connects you to short, meaningful volunteer tasks you can do online or nearby — perfect for busy schedules.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/tasks" type="primary">Browse Tasks</Button>
          <Button href="/signup" type="secondary">Create Account</Button>
        </div>
      </main>

      <div className= "relative z-10 mt-auto"> 
        <SiteFooter />
      </div>
    </div>
    
  );
}
