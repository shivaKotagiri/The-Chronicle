/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { BlogTotalType } from "@shivakumarkotagiri/common-blogs-app";
import { useCallback } from "react";

export const useBlogs = ():[BlogTotalType[], Dispatch<SetStateAction<BlogTotalType[]>>, boolean] => {
  const [blogs, setBlogs] = useState<BlogTotalType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const  fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const blogData = await axios.get(`${backendUrl}/api/v1/blog/bulk`,
        {
          headers:{
            Authorization: "Bearer"+" "+localStorage.getItem("token"),
          }
        }
      );
      if (blogData.data && Array.isArray(blogData.data.blogs)) {
        setBlogs(blogData.data.blogs);
      } else {
        console.warn("Unexpected API response format:", blogData.data);
        setBlogs([]);
      }
    } catch (e: any) {
      console.error("Error fetching blogs:", e);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return [blogs, setBlogs, loading];
}

