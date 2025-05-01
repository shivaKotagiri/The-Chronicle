/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from "react";
import BlogCard from "../components/BlogCard";
import NavBarBlogs from "../components/NavBarBlogs";
import { useUserBlogs } from "../hooks/useUserBlogs";

function UserBlogs() {
  const [blogs, _setBlogs, loading] = useUserBlogs();

  return (
    <div className="bg-black flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <NavBarBlogs />
      <div className="pt-30 px-4 md:px-8 max-w-7xl mx-auto w-auto flex flex-col">
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="w-full">
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog} edit={true} deleteBlog={true} />)}
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">No blogs available</h2>
              <p className="text-gray-400">You haven't created any blogs yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(UserBlogs);
