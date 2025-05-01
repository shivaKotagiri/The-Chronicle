/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from "react";
import BlogCard from "../components/BlogCard";
import NavBarBlogs from "../components/NavBarBlogs";
import { useBlogs } from "../hooks/useBlogs";

function BlogPage() {
  const [blogs, _setBlogs, loading] = useBlogs();

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <NavBarBlogs />
      <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto h-[calc(100vh-96px)] flex flex-col">
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="w-full">
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog} edit={false} deleteBlog={false} />)}
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">No blogs available</h2>
              <p className="text-gray-400">No one haven't created any blogs yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BlogPage);
