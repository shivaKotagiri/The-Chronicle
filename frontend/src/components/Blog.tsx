/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import NavBarBlogs from "./NavBarBlogs"
import { memo, useMemo, useState } from "react";
import { BlogTotalType } from "@shivakumarkotagiri/common-blogs-app";
import axios from "axios";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogTotalType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useMemo(() => {
    async function fetchBlog():Promise<void> {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/v1/blog/${id}`,
          {
            headers:{
              Authorization: "Bearer"+" "+localStorage.getItem("token"),
            }
          }
        );
        if(response.data && response.data.blog){
          setBlog(response.data.blog)
        }
      } catch(e:any){
        console.error("The error is", e);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-screen min-h-screen text-white flex flex-col bg-black">
        <NavBarBlogs />
        <div className="w-full flex justify-center items-center h-96">
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  const publishedDate = blog?.publishedAt instanceof Date ? blog?.publishedAt : new Date(blog?.publishedAt || "");

  return (
    <>
      <div className="max-w-screen min-h-screen text-white flex flex-col bg-black">
        <NavBarBlogs />
        <div className="w-auto mx-3 flex justify-center pt-30">
          <div className="w-auto md:w-[75%] p-5 md:p-7 bg-[#0A0A0A] shadow-sm shadow-blue-500/20 border border-gray-900 rounded-lg">
            <div className="flex flex-col md:flex-row md:justify-between mb-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{blog?.title}</h1>
                <div className="text-sm text-gray-300 mt-2">Posted on {publishedDate.toLocaleDateString()}</div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex md:items-center">
                <div className="text-sm text-gray-300 mb-2">Author</div>
                <div className="flex items-center">
                  <div className="w-13 h-13 rounded-full text-lg bg-gray-900 flex justify-center items-center mr-3">{blog?.author.firstName[0]}</div>
                  <div className="text-md font-semibold">{blog?.author.firstName+" "+blog?.author.lastName}</div>
                </div>
              </div>
            </div>
            <div className="text-justify text-gray-200 leading-relaxed">
              <p className="mb-4 whitespace-pre-wrap">{blog?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Blog);
