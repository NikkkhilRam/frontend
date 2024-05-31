/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, loginUser, register } from "../redux/authSlice";
import { RingLoader } from "react-spinners";

function AuthModal({ handleClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user, handleClose]);

  const handleAuthentication = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      dispatch(register({ email, password, username }));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Signup" : "Login"}
        </h2>
        <form className="space-y-4" onSubmit={handleAuthentication}>
          {isSignup && (
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                placeholder="Enter your username"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Enter your password"
            />
          </div>
          {isSignup && (
            <div>
              <label
                htmlFor="retype-password"
                className="block text-lg font-medium text-gray-700"
              >
                Retype Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="retype-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                placeholder="Retype your password"
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isSignup && !isLoading ? "Signup" : "Login"}
              {isLoading && "Loading.."}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="text-black hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Signup"}
            </button>
          </div>
        </form>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
