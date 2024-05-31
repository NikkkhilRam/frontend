import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import NewStory from "./pages/NewStory/NewStory";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Blog from "./pages/Blog/Blog";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/new-story" element={<NewStory />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
