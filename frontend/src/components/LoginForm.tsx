/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SigninType } from "@shivakumarkotagiri/common-blogs-app";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setLoading(true);


    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const object:SigninType = {
        email,
        password
      }

      if(!email || !password){
        alert("All the fields are required");
        setLoading(false);
        return;
      }

      if(password.length<6){
        alert("The password must be 6 characters long")
        setLoading(false);
        return;
      }
      const response = await axios.post(`${backendUrl}/api/v1/user/signin`,object);
      if(response.data.token){
        localStorage.setItem("token",response.data.token);
        navigate("/blogs");
      }
      else{
        alert("Invalid response from the server")
      }

    }
    catch(e:any) {
      alert(e.response?.data?.message || "Unable to Login, Please try again later");
    }
    finally{
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <div className="w-screen sticky top-0 z-50">
        <MemoizedNavBarContainer />
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-4 pt-16">
        <div className="shadow-2xl rounded-lg shadow-blue-500/20 border border-gray-800 w-full max-w-md bg-black p-4 md:rounded-2xl md:p-8">
          <h2 className="text-xl font-bold text-neutral-200">
            Welcome to The Chronicle
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-300">
            Login to  The Chronicle if you have an account
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input required id="email" placeholder="projectmayhem@fc.com" type="email" setChange={setEmail} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-5">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" placeholder="••••••••" type="password" setChange={setPassword} />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mb-5 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading? "Logging in...":"Login →"}
              <BottomGradient />
            </button>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

            <div className="footer text-center">
              <p className="text-neutral-400 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={handleSignupClick}
                  className="text-purple-500 hover:text-purple-400 font-medium transition-colors cursor-pointer"
                  type="button"
                >
                  Signup here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const NavBarContainer = () => {
  return (
    <div className="w-screen sticky top-0 z-50">
      <NavBar />
    </div>
  );
};

const MemoizedNavBarContainer = memo(NavBarContainer);

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
