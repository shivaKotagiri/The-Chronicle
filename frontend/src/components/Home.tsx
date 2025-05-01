import { useNavigate } from "react-router-dom";
import { Vortex } from "./ui/vortex";

export default function Home  () {
  const navigate = useNavigate();
  return (
      <div className="w-screen bg-black mx-auto rounded-md h-screen overflow-hidden">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-screen h-screen"
        >
          <div className="text-center justify-center align-middle items-center w-xl">
            <h2 className="text-gray-300 text-4xl md:text-6xl font-bold text-center">
              Chronicle
            </h2>
            <h3 className="text-white text-xl md:text-3xl font-bold text-center">
              Write. Connect. Remember.
            </h3>
            <div className="flex text-center justify-center items-center">
              <p className="text-white w-[60%] md:w-[80%] justify-center align-middle items-center  text-sm md:text-xl mt-4 text-center">
              The elegant solution for capturing thoughts and building a loyal readership.
              </p>
            </div>
          </div>
          <div className="flex sm:flex-row items-center gap-4 mt-6">
            <button className="cursor-pointer px-4 py-2 bg-green-800 hover:bg-purple-900 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="cursor-pointer px-6 py-2 border border-gray-400 rounded-2xl hover:bg-accent-foreground transition duration-200 text-white" onClick={() => navigate("/login")}>Login</button>
          </div>
        </Vortex>
      </div>
  );
}
