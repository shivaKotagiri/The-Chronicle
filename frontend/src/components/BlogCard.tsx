/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogTotalType } from "@shivakumarkotagiri/common-blogs-app";
import axios from "axios";
import { Edit2Icon, Trash } from "lucide-react";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog, edit = false, deleteBlog = false }: {
  blog: BlogTotalType,
  edit?: boolean,
  deleteBlog?: boolean
}) {
  const navigate = useNavigate();
  const [deleteClick, setDeleteClick] = useState<boolean>(false);

  const handleDelete = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();

    setDeleteClick(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.delete(`${backendUrl}/api/v1/blog/delete/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      window.location.reload();
    }
    catch (e: any) {
      console.error("Error deleting blog:", e);
      alert("Something went wrong with deletion, please try again later");
    } finally {
      setDeleteClick(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${blog.id}`);
  };

  function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, readingTimeMinutes);
  }

  const publishedDate = blog.publishedAt instanceof Date ? blog.publishedAt : new Date(blog.publishedAt);

  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="cursor-pointer bg-black hover:scale-[103%] shadow-sm mb-7 rounded-xl transition duration-250 shadow-blue-200/20 border border-gray-950 p-5 text-white w-[90%] md:w-[70%] mx-auto"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full text-lg bg-gray-900 flex justify-center text-center items-center mr-3">
          {blog.author.firstName?.toUpperCase()[0] || '?'}
        </div>
        <div className="flex-col">
          <div className="text-md font-semibold">
            {`${blog.author.firstName || ''} ${blog.author.lastName || ''}`}
          </div>
          <small className="flex-start text-gray-400">
            {publishedDate.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}
          </small>
        </div>
      </div>
      <div className="font-bold text-md md:text-xl text-gray-100 mt-2">{blog.title}</div>
      <div className="text-sm text-gray-300 mt-3 text-justify line-clamp-3">{blog.description}</div>
      <div className="flex justify-between mt-3.5">
        <small className="text-gray-400">{calculateReadingTime(blog.description)} min read</small>
        {(edit && deleteBlog) && (
          <div className="gap-3 flex text-gray-400">
            <div
              onClick={handleEdit}
              className="hover:text-gray-500 transition duration-250 cursor-pointer"
            >
              <Edit2Icon size={17} />
            </div>
            <div
              onClick={handleDelete}
              className={`hover:text-gray-500 transition duration-250 cursor-pointer ${deleteClick ? 'opacity-50' : ''}`}
            >
              <Trash size={17} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BlogCard);
