/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNavigate } from "react-router-dom";
import NavBarBlogs from "./NavBarBlogs"
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "@shivakumarkotagiri/common-blogs-app";

function BlogCreate() {
  // const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);


  useEffect(() => {
    if(message){
      const timeout = setTimeout(()=>{
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const handleButton = async () => {
    setLoading(true);
    setMessage(null);

    if (!title.trim()) {
      setMessage({ text: "Please enter a blog title", type: 'error' });
      setLoading(false);
      return;
    }

    if (!description.trim()) {
      setMessage({ text: "Please enter blog content", type: 'error' });
      setLoading(false);
      return;
    }

    const blogData: BlogType = {
      title,
      description
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({ text: "You must be logged in to create a blog", type: 'error' });
        setLoading(false);
        // navigate("/login");
        return;
      }

      await axios.post(
        `${backendUrl}/api/v1/blog`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setDescription("");
      setMessage({ text: "Blog created successfully!", type: 'success' });

    }
    catch(e: any) {
      console.error("Error creating blog:", e);
      setMessage({
        text: e.response?.data?.message || "Unable to create a blog. Please try again later.",
        type: 'error'
      });
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-screen min-h-screen text-white flex flex-col bg-black">
        <div className="z-40"><NavBarBlogs /></div>
        <div className="w-[85%] md:w-[65%] rounded-lg h-auto mx-auto shadow-2xl shadow-blue-500/20 border border-gray-800 justify-center mt-25 md:my-auto p-5 md:p-7">
          <div>
            <div className="font-semibold text-2xl">
              Craft Your Chronicle
            </div>
            <div className="text-sm text-gray-300 mt-3">Share your thoughts, stories, and ideas with the world. Your words matter.</div>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.type === 'success'
                ? "bg-green-900/30 border border-green-800 text-green-200"
                : "bg-red-900/30 border border-red-800 text-red-200"
            }`}>
              {message.text}
            </div>
          )}

          <input
            value={title}
            onChange={handleInput}
            type="text"
            placeholder="Enter the blog title..."
            className="text-xl font-semibold text-gray-300 focus:outline-none p-3 w-full rounded-xl shadow-blue-500/20 border-2 border-gray-800 mt-5"
          />

          <textarea
            value={description}
            onChange={handleDescription}
            placeholder="Share your thoughts..."
            className="text-lg text-gray-300 w-full focus:outline-none shadow-blue-500/20 border-2 border-gray-800 mt-5 rounded-xl p-3 h-70"
          ></textarea>

          <button
            className="group/btn border-2 border-gray-800 p-3 text-center justify-center items-center flex text-lg relative h-10 w-full rounded-md font-medium mt-3 text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="button"
            onClick={handleButton}
            disabled={loading}
          >
            {loading ? "Creating the Blog..." : "Create Blog"}
            <BottomGradient />
          </button>
        </div>
      </div>
    </>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default BlogCreate;
