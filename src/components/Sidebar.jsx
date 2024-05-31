import React from "react";

const topicsList = [
  "Web3",
  "Entertainment",
  "History",
  "Humor",
  "Web Development",
  "Politics",
  "Food",
];

function RecommendedTopics() {
  return (
    <div className="flex flex-wrap gap-2">
      {topicsList.map((topic) => {
        return (
          <button className="bg-gray-200 px-5 py-2 rounded-full">
            {topic}
          </button>
        );
      })}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="p-3">
      <div className="flex flex-col gap-4">
        <strong>Recommended Topics</strong>
        <RecommendedTopics />
      </div>
    </div>
  );
}

export default Sidebar;
