import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";

function ProfileSettings() {
  const { isLoading, error, sendRequest: callApi } = useHttp();
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedInUser) {
      callApi({ url: `http://localhost:3000/api/v1/users` }, (response) => {
        setUser(response);
        setUsername(response.username);
        setDisplayName(response.displayName);
        setEmail(response.email);
        setLocation(response.location);
        setBio(response.bio);
        setSelectedColor(response.branding);
      });
    }
  }, [callApi, loggedInUser]);

  const handleSaveProfile = () => {
    const updatedProfile = {
      location,
      bio,
      branding: selectedColor,
    };

    callApi(
      {
        url: `http://localhost:3000/api/v1/users`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedProfile,
      },
      (response) => {
        setUser(response);
      }
    );
  };

  return (
    <div className="flex w-[800px] flex-col gap-4 mt-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isLoading && user && (
        <>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-2xl font-bold mb-4">User</p>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-lg font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                disabled
                id="username"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                disabled
                type="email"
                id="email"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-2xl font-bold mb-4">Basic</p>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="text-lg font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label
                htmlFor="bio"
                className="text-lg font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-2xl font-bold mb-4">Branding</p>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-gray-700">
                Pick a Color
              </label>
              <input
                type="color"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <div
                className="rounded-md p-2"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg my-4"
            onClick={handleSaveProfile}
          >
            Save Profile Information
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileSettings;
