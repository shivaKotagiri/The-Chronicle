import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlogTotalType } from "@shivakumarkotagiri/common-blogs-app";

interface UseBlogSearchReturn {
  searchResults: BlogTotalType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: (query?: string) => Promise<void>;
}

export const useBlogSearch = (initialQuery: string = ""): UseBlogSearchReturn => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<BlogTotalType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

    const performSearch = useCallback(async (manualQuery?: string) => {
    const queryToUse = manualQuery !== undefined ? manualQuery : debouncedQuery;

    if (!queryToUse.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(
        `${backendUrl}/api/v1/blog/search?value=${encodeURIComponent(queryToUse)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data.searchResults)) {
        setSearchResults(response.data.searchResults);
      } else if (
        response.data &&
        response.data.message &&
        response.data.message.includes("No available blogs")
      ) {
        setSearchResults([]);
        setError(null);
      } else {
        console.warn("Unexpected API response format:", response.data);
        setSearchResults([]);
        setError("Received unexpected data format from server");
      }
    } catch (err) {
      console.error("Error searching blogs:", err);
      setSearchResults([]);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    performSearch();
  }, [debouncedQuery, performSearch]);

  return {
    searchResults,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    performSearch
  };
};
