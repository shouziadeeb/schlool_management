"use client";
import { useState } from "react";
import AddSchool from "./components/AddSchool";
import ShowSchools from "./components/ShowSchools";
// import AddSchool from "../app/components/AddSchool";
// import ShowSchools from "../app/components/ShowSchools";

export default function HomePage() {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center w-full  py-6 h-full">
      <button
        onClick={() => setIsToggle(!isToggle)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        {isToggle ? "Show Schools" : "Add School"}
      </button>

      {isToggle ? <AddSchool /> : <ShowSchools />}
    </div>
  );
}
