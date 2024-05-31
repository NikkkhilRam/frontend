/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateTimeformats";

const tags = ["#agile", "#ai", "#estimates"];

function ArticleCard({ callback, user, title, content, createdAt, tag }) {
  return (
    <div className=" p-5 flex gap-2 items-center sm:flex-row flex-col justify-between bg-white mb-2 border-b">
      <div className="  flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src="https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F361785%2Fc49561cf-b2fc-457f-b21e-0ecae2f9aeef.png"
            alt=""
            className="w-6 h-6 rounded-full"
          />
          <Link to={`/profile/${user}`} className="font-bold">
            {user}
          </Link>
          <p className="text-sm"> • {formatDate(createdAt)}</p>
        </div>
        <button
          className="flex flex-col items-start justify-start text-start"
          onClick={callback}
        >
          <h1 className="text-2xl font-bold">{title}</h1>
          <p>{content.slice(0, Math.min(content.length, 150))}</p>
          <div className="flex items-center gap-2 mt-4">
            <p className="bg-gray-100 inline-block px-2 py-1 rounded-full text-sm ">
              {tag}
            </p>
            <p className="text-sm text-gray-500">5 min read</p>
          </div>
        </button>
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fill:112:112/1*vWvkkgG6uvgmJT8GkId98A.png"
        alt=""
        className="w-28 h-28"
      />
    </div>
  );
}

export default ArticleCard;
