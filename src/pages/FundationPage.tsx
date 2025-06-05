import { useState } from "react";
import QuickButton from "../components/buttons/QuickButton";

export default function Fundation() {
  const [showButtons, setShowButtons] = useState(false);
  return (
    <div className="w-full h-full flex">
      <div className="fixed right-8 bottom-5 z-50">
        {/* Button 3 (Paling kiri) */}
        <button
          className={`
          transition-all duration-500 ease-out
          transform 
          ${
            showButtons
              ? "translate-x-0 opacity-100 delay-200"
              : "translate-x-10 opacity-0 delay-100"
          }
          bg-blue-500 text-white px-4 py-2 rounded
        `}
        >
          Button 3
        </button>

        {/* Button 2 (Tengah) */}
        <button
          className={`
          transition-all duration-500 ease-out
          transform 
          ${
            showButtons
              ? "translate-x-0 opacity-100 delay-100"
              : "translate-x-10 opacity-0 delay-200"
          }
          bg-green-500 text-white px-4 py-2 rounded
        `}
        >
          Button 2
        </button>
        <button
          onClick={() => setShowButtons(!showButtons)}
          className="bg-red-500 text-white px-4 py-2 rounded z-10"
        >
          Core
        </button>

        <QuickButton />
      </div>
    </div>
  );
}
