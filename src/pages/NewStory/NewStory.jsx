import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";

const tagsList = ["Technology", "Science", "Art", "Travel", "Food", "Health"];

function NewStory() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const { isLoading, error, sendRequest: callApi } = useHttp();

  const navigate = useNavigate();

  useEffect(() => {
    callApi({ url: "http://localhost:3000/api/v1/tags" }, (response) => {
      setTags(response);
    });
  }, []);

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (title != "" && content != "") {
      const blog = { title, content, tagId: selectedTag };
      callApi(
        {
          url: "http://localhost:3000/api/v1/blogs",
          method: "POST",
          body: blog,
          headers: { "Content-Type": "application/json" },
        },
        (response) => {
          navigate("/");
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center sm:w-1/2 mx-auto">
      <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create New Story
        </h1>
        <form className="space-y-4" onSubmit={handleSaveBlog}>
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Enter the title of your story"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              id="content"
              className="mt-1 block w-full h-44 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Write your story here..."
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags &&
                tags.map((tag) => (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => setSelectedTag(tag._id)}
                    className={`border border-black rounded-full px-3 py-2  ${
                      selectedTag === tag._id
                        ? "bg-black text-white"
                        : "text-black"
                    }`}
                  >
                    {tag.tag}
                  </button>
                ))}
            </div>
          </div>
          <div className="flex mt-10 justify-between items-center ">
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Add Image
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewStory;
