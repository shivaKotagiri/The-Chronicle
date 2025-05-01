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
      <div className="cursor-pointer mr-3" onClick={() => navigate("/blogs")}>
        <SparklesPreview />
      </div>
      <div className="flex xl:translate-x-10 w-screen justify-center">
        <div
          onClick={() => navigate("/searchblogs")}
          className="flex items-center cursor-pointer rounded-2xl bg-gray-900/60 px-4 border border-gray-800 hover:bg-gray-800/80 transition-colors"
        >
          <div className="flex">
            <span className="text-md text-gray-300">Search</span>
            <Search className="w-5 hidden md:block h-5 ml-2 text-blue-400" />
          </div>
        </div>
      </div>
      <div onClick={() => navigate("/blog/create")} itemType="button" className="mt-1 h-10 ml-3 bg-black md:h-12 hover:bg-gray-950 cursor-pointer rounded-full md:rounded-4xl p-2 lg:p-2 flex md:w-[30%] lg:w-[17%] xl:w-[15%] 2xl:w-[13%] border-2 border-gray-800 mr-3 md:mr-7 lg:mr-10 justify-center items-center">
        <div className="md:mr-2"><Plus /></div>
        <div className="hidden md:block">Create Blog</div>
      </div>
      <div className="mt-3 relative">
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
