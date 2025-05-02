import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { Menu } from "lucide-react"

function DropDown() {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="cursor-pointer">
            <Menu size={30} className="text-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>The Chronicle</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="cursor-pointer" onClick={() => navigate("/signup")}><DropdownMenuItem>Sign Up</DropdownMenuItem></div>
          <div className="cursor-pointer" onClick={() => navigate("/login")}><DropdownMenuItem>Login</DropdownMenuItem></div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropDown
