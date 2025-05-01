import { useNavigate, useLocation } from "react-router-dom";
import { BlogTotalType } from "@shivakumarkotagiri/common-blogs-app";
import { Input } from "../components/ui/moving-border";
import { Search, Loader2, RefreshCw } from "lucide-react";
import NavBarBlogs from "../components/NavBarBlogs";
import { useBlogSearch } from "../hooks/useBlogSearch";

export default function SearchBlogs() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || "";
  const navigate = useNavigate();

  const {
    searchResults,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    performSearch
  } = useBlogSearch(initialQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const newUrl = e.target.value
      ? `/searchblogs?query=${encodeURIComponent(e.target.value)}`
      : '/searchblogs';
    window.history.replaceState({}, '', newUrl);
  };

  //The encodeURIComponent() function in JavaScript is used to safely encode a URI component, such as a query parameter, so that it can be included in a URL without breaking the structure of the URL.

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBarBlogs />

      <div className="pt-28 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Search Blogs</h1>

        <div className="w-full max-w-3xl mx-auto mb-12">
          <Input
            borderRadius="1.75rem"
            className="bg-gray-950/80 text-white border-gray-700"
            borderClassName="bg-[radial-gradient(#3b82f6_40%,transparent_60%)]"
            placeholder="Search blogs by title, content, or author..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            containerClassName="shadow-lg"
            duration={4000}
            showSearchIcon={true}
          />
        </div>

        {error && error !== "No results found" && (
          <div className="bg-red-900/50 border border-red-700 text-white p-4 rounded-md mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => performSearch(searchQuery)}
              className="text-white bg-red-700 hover:bg-red-800 rounded-md px-3 py-1 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((blog: BlogTotalType) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-300 cursor-pointer border border-gray-800 shadow-lg"
              >
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-400 text-sm mb-3">
                    By {blog.author.firstName+" "+blog.author.lastName || "Unknown"} • {new Date(blog.publishedAt || Date.now()).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 line-clamp-3">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12 text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No blogs found matching "{searchQuery}"</p>
            <p className="mt-2">Try different keywords or check your spelling</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Enter a search term to find blogs</p>
            <p className="mt-2">Discover articles by title, content, or author</p>
          </div>
        )}
      </div>
    </div>
  );
}
