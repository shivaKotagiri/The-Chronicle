import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import BlogPage from "./pages/BlogPage";
import Blog from "./components/Blog";
import BlogCreate from "./components/BlogCreate";
import Settings from "./components/Settings";
import UserBlogs from "./pages/UserBlogs";
import SearchBlogs from "./pages/SearchBlogs";
import BlogEdit from "./components/BlogEdit";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <div className="flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blog/create" element={<BlogCreate />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/myblogs" element={<UserBlogs />} />
            <Route path="/searchblogs" element={<SearchBlogs />} />
            <Route path="/edit/:id" element={<BlogEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
