/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import SparklesPreview from "./SparklesPreview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { Menu, Plus, Search } from "lucide-react"
import { memo } from "react";

function NavBarBlogs() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    }
    catch(e: any) {
      console.log("The error is:", e);
    }
  }

  return (
    <div className="justify-between pt-5 h-20 px-5 text-white flex bg-black w-full fixed z-50">
      <div className="cursor-pointer" onClick={() => navigate("/blogs")}>
        <SparklesPreview />
      </div>
      <div className="flex xl:translate-x-10 w-screen justify-center">
        <div
          onClick={() => navigate("/searchblogs")}
          className="flex items-center cursor-pointer bg-gray-900/60 px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-800/80 transition-colors"
        >
          <span className="text-gray-300">Search for blogs</span>
          <Search className="w-5 h-5 ml-2 text-blue-400" />
        </div>
      </div>
      <div onClick={() => navigate("/blog/create")} itemType="button" className="h-10 bg-black md:h-12 hover:bg-gray-950 cursor-pointer rounded-4xl p-1 lg:p-2 flex md:w-[30%] lg:w-[17%] xl:w-[15%] 2xl:w-[13%] border-2 border-gray-800 mr-5 md:mr-7 lg:mr-10 justify-center items-center">
        <div className="md:mr-2"><Plus /></div>
        <div className="hidden md:block">Create Blog</div>
      </div>
      <div className="mt-2 relative">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer">
              <Menu className="text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[100]">
            <DropdownMenuLabel>Chronicle</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="cursor-pointer" onClick={() => navigate("/settings")}><DropdownMenuItem>Settings</DropdownMenuItem></div>
            <div className="cursor-pointer" onClick={() => navigate("/myblogs")}><DropdownMenuItem>My Blogs</DropdownMenuItem></div>
            <div className="cursor-pointer" onClick={handleLogout}><DropdownMenuItem>Log out</DropdownMenuItem></div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default memo(NavBarBlogs);
