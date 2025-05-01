import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import SparklesPreview from "./SparklesPreview";
// import { memo } from "react";

// const SPARKLE_DENSITY:number = 3000; // i used memo to memoize the SparklesComponent
/* here i created a varibale sparkle-density which is outside the component so it can't be rerendered if you
don't want the SPARKLE_DENSITY to be outside then u can use useMemo to memoise the state values like this
const density = useMemo(() => 3000, []); -> inside the component
*/

function NavBar() {
  const navigate = useNavigate();
  // const density:number = 3000; //why i didn't initialised it here because This creates a new density value on every render, even though the value is always 3000.so  Move the density value outside the component
  return (
    <div className="justify-between px-5 text-white flex bg-transparent w-full fixed top-3">
      <div className="cursor-pointer mt-3 md:mt-0" onClick={() => navigate("/")}>
        {/* <SparklesPreview density={SPARKLE_DENSITY} /> */}
        <SparklesPreview />
      </div>
      <div className="mt-2"><DropDown /></div>
    </div>
  );
}

export default NavBar;
// export default memo(NavBar);


