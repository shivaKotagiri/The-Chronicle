/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { InputUpdateType } from "@shivakumarkotagiri/common-blogs-app";
import axios from "axios"
import NavBarBlogs from "./NavBarBlogs";
import { AlertDialogDemo } from "./AlertDialogDemo";

export default function Settings() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const object: InputUpdateType = {
    password,
    firstName,
    lastName
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setLoading(true);

    if(password.trim().length === 0 || !password){
      setLoading(false);
      setMessage({text:"Please enter a passoword", type: 'error'});
      return;
    }

    if(password != confirmPassword){
      setLoading(false);
      setMessage({text:"Given Password is not Similar", type: 'error'});
      return;
    }


    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.put(`${backendUrl}/api/v1/user/update`,object,
        {
          headers:{
            Authorization:"Bearer"+" "+localStorage.getItem("token"),
          }
        }
      );
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setMessage({text: response.data.message, type: 'success'});
      setLoading(false);
    }
    catch(e:any) {
      setMessage({text: e.response?.data?.message || "Update failed", type: 'error'});
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  w-screen bg-black flex flex-col">
      <div className="w-screen sticky top-0 z-50">
        <MemoizedNavBarContainer />
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-4 pt-16">
        <div className="shadow-2xl shadow-blue-500/20 border border-gray-800 w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
          <h2 className="text-xl font-bold text-neutral-200">
            Account Settings
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-300">
            Manage your profile information and account preferences.
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" setChange = { setFirstName } />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" setChange = { setLastName } />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" setChange = { setPassword } />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" placeholder="••••••••" type="password" setChange = { setConfirmPassword } />
            </LabelInputContainer>

            {message && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                message.type === 'success'
                  ? "bg-green-900/30 border border-green-800 text-green-200"
                  : "bg-red-900/30 border border-red-800 text-red-200"
              }`}>
                {message.text}
              </div>
            )}

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mb-5 cursor-pointer"
              type="submit" disabled={loading}
            >
              {loading?"Processing your request":"Confirm Changes"}
              <BottomGradient />
            </button>

            <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

            <div className="footer text-center">
              <div className="text-xl font-semibold text-gray-200 mb-2">Delete Account</div>
              <p className="text-white text-justify text-sm mb-5">Warning: This action is permanent. All your data will be deleted forever. </p>
            </div>

            <div className="justify-center flex w-full"><AlertDialogDemo /></div>
          </form>
        </div>
      </div>
    </div>
  );
}

const NavBarContainer = () => {
  return (
    <div className="w-screen sticky top-0 z-50">
      <NavBarBlogs />
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
