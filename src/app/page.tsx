import { MoviesContent } from "@/components/movies-content";
import { PreferenceText } from "../components/preference-text";

export default function Home() {
  return (
    <div className="px-5 py-10 sm:p-0 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center flex flex-col items-center w-full space-y-5">
        <h3 className="text-4xl md:text-5xl bg-gradient-to-l to-gray-50 from-gray-400 inline-block text-transparent bg-clip-text">
          Recomenda<b className="text-primary">AI</b>
        </h3>

        <MoviesContent />
        <PreferenceText />
      </div>
    </div>
  );
}
