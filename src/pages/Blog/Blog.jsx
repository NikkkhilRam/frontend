import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const { isLoading, error, sendRequest: callApi } = useHttp();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    callApi({ url: `http://localhost:3000/api/v1/blogs/${id}` }, (response) => {
      setBlog(response.blog);
    });
  }, [id, callApi]);

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="bg-[#F5F5F5] py-10 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white text-black border border-black  ">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{blog.username}</span>
            <span className="text-gray-600">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        </div>
        <div className="mb-6">
          <p className="whitespace-pre-line">{blog.content}</p>
        </div>
        <div className="flex justify-end space-x-4">
          
          <button className="bg-black text-white py-2 px-4 rounded">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
