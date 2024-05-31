import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Profile() {
  const { username } = useParams();
  const { isLoading, error, sendRequest: callApi } = useHttp();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (username) {
      callApi(
        { url: `http://localhost:3000/api/v1/users/profile/${username}` },
        (response) => {
          if (Array.isArray(response)) {
            setUser(response[0]);
          } else {
            setUser(response);
          }
        }
      );
    }
  }, [username, callApi]);

  useEffect(() => {
    if (username) {
      callApi(
        { url: `http://localhost:3000/api/v1/blogs/user/${username}` },
        (response) => {
          setBlogs(response.blogs);
        }
      );
    }
  }, [username, callApi]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <header
        style={{ backgroundColor: user ? user.branding : "#FFF" }}
        className="text-white p-6"
      >
        <div className="flex gap-2 flex-col absolute">
          {loggedInUser && loggedInUser.username === username && (
            <div>
              <Link
                to={"/settings"}
                className="bg-white inline-block text-black px-4 py-2 rounded-full"
              >
                Settings
              </Link>
            </div>
          )}
          {loggedInUser && loggedInUser.username === username && (
            <div>
              <button
                onClick={logoutHandler}
                className="inline-block bg-white text-black px-4 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center md:flex-row md:items-start md:space-x-6">
          <img
            src="https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F361785%2Fc49561cf-b2fc-457f-b21e-0ecae2f9aeef.png"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 md:mb-0"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user && user.username}</h1>
            {user && user.location && (
              <p className="mb-4">City: {user.location}</p>
            )}
            <p className="mb-4">{user && user.bio}</p>
            <p className="mb-2">
              Email:{" "}
              <a
                href={`mailto:${user ? user.email : ""}`}
                className="text-blue-500 underline"
              >
                {user && user.email}
              </a>
            </p>
          </div>
        </div>
      </header>
      {isLoading && <Skeleton count={50} />}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-col sm:w-2/3 mx-auto mt-4">
        {blogs.map((blog) => (
          <ArticleCard
            callback={() => {
              navigate(`/blog/${blog._id}`);
            }}
            key={blog._id}
            content={blog.content}
            createdAt={blog.createdAt}
            tag={blog.tag}
            title={blog.title}
            user={blog.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
