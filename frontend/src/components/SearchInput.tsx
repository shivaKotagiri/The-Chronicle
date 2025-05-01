"use client";
import { Input } from "./ui/moving-border";
import { SetStateAction, useState } from "react";

export default function SearchInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full max-w-[80%] md:max-w-[40%] mx-auto">
      <Input
        borderRadius="1.75rem"
        className="bg-gray-950/80 text-white border-gray-700"
        borderClassName="bg-[radial-gradient(#3b82f6_40%,transparent_60%)]"
        placeholder="Search something..."
        value={value}
        onChange={handleChange}
        containerClassName="shadow-lg"
        duration={4000}
      />
    </div>
  );
}
