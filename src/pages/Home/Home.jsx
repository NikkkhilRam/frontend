import { useDispatch, useSelector } from "react-redux";
import ContentSection from "../../components/ContentSection";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";

function Home() {


  return (
    <div className="min-h-screen bg-white w-full flex ">
      <div className="hidden sm:flex lg:w-1/4 bg-[#F5F5F5]"></div>
      <div className="sm:w-2/3 w-full border-l ">
        <ContentSection />
      </div>
      <div className=" hidden sm:flex w-1/4 border-l bg-[#F5F5F5]">
      </div>
    </div>
  );
}

export default Home;
