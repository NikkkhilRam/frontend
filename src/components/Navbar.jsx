import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import { GiCoffeePot } from "react-icons/gi";


function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLoginModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-b-[1px] flex items-center justify-between bg-white border-gray-200 h-14 w-full py-3">
      <Link
        to={"/"}
        className="ml-2 flex items-center gap-2 bg-black text-white w-min p-2 font-medium rounded-md text-lg"
      >
        <p>BitBrew</p>
        <GiCoffeePot />
      </Link>
      <div className="flex items-center gap-4 px-4">
        {user && (
          <Link
            to="/new-story"
            className="border px-3 py-1 rounded-full border-black text-lg font-medium hover:bg-black hover:text-white"
          >
            <p>Write</p>
          </Link>
        )}
        {user ? (
          <p className="sm:flex hidden text-lg font-medium">{user && user.username}</p>
        ) : (
          <button
            onClick={handleLoginModal}
            className="border px-3 py-1 rounded-full border-black text-lg font-medium hover:bg-black hover:text-white"
          >
            <p>Login/Signup</p>
          </button>
        )}
        {user && (
          <Link to={`/profile/${user && user.username}`}>
            <CgProfile size={24} />
          </Link>
        )}
      </div>
      {isModalOpen && <AuthModal handleClose={handleCloseModal} />}
    </div>
  );
}

export default Navbar;
