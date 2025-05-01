
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
    <div className="justify-between py-2 sm:py-3 md:py-4 h-16 sm:h-18 md:h-20 px-2 sm:px-3 md:px-5 text-white flex items-center bg-black w-full fixed z-50">
      <div className="cursor-pointer mt-7 flex items-center" onClick={() => navigate("/blogs")}>
        <SparklesPreview />
      </div>

      <div className="flex flex-1 justify-center px-2 sm:px-4">
        <div
          onClick={() => navigate("/searchblogs")}
          className="mt-1 flex items-center justify-center cursor-pointer rounded-3xl sm:rounded-2xl bg-gray-900/60 px-2 sm:px-3 md:px-4 py-3 border border-gray-800 hover:bg-gray-800/80 transition-colors w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <span className="text-sm sm:text-md text-gray-300">Search Blogs</span>
          <Search className="w-4 h-4 sm:w-5 sm:h-5 ml-1 text-center sm:ml-2 text-gray-400" />
        </div>
      </div>

      <div
        onClick={() => navigate("/blog/create")}
        className="h-8 sm:h-10 md:h-12 bg-black hover:bg-gray-950 cursor-pointer rounded-full py-4.5 p-2 flex border-2 border-gray-800 items-center justify-center transition-colors mx-1 sm:mx-2 md:mx-3"
      >
        <Plus className="w-5 h-5 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline ml-1 md:ml-2 text-sm md:text-base whitespace-nowrap">Create Blog</span>
      </div>

      <div className="relative flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer p-1">
              <Menu size={30} className="text-white" />
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
