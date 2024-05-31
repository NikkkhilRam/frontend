import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import useHttp from "../hooks/useHttp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const ContentSection = () => {
  const { isLoading, error, sendRequest: callApi } = useHttp();
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    callApi({ url: "http://localhost:3000/api/v1/blogs" }, (response) => {
      setBlogs(response.blogs);
    });

    callApi({ url: "http://localhost:3000/api/v1/tags" }, (response) => {
      setTags(response);
    });
  }, [callApi]);

  useEffect(() => {
    if (selectedTag) {
      callApi(
        {
          url: `http://localhost:3000/api/v1/blogs/tags/${selectedTag}`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        (response) => {
          setBlogs(response.blogs);
        }
      );
    }
  }, [callApi, selectedTag]);

  return (
    <div className="w-full p-3">
      <div className="">
        <div className="flex pb-4 gap-10 overflow-x-auto  space-x-5 justify-around border-b py-2 text-gray-500">
          {tags &&
            tags.map((tag) => (
              <button
                onClick={() => {
                  setSelectedTag(tag._id);
                }}
                key={tag._id}
                className={`hover:text-black ${
                  selectedTag === tag._id && "font-bold text-black"
                }`}
              >
                {tag.tag}
              </button>
            ))}
        </div>
      </div>

      {isLoading && <Skeleton count={50} />}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-col">
        {blogs.length > 0 &&
          blogs.map((blog) => (
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

        {blogs.length === 0 && (
          <div className="flex  justify-center items-center mt-20  text-gray-500 text-xl ">
            Looks like this corner of the internet is as quiet as a library at
            midnight. No blogs to be found!
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
