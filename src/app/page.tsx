"use client";
import { useState } from "react";
import AddSchool from "../app/components/AddSchool";
import ShowSchools from "../app/components/ShowSchools";

export default function HomePage() {
  const [isToggle, setIsToggle] = useState<boolean>(true);

  return (
    <div className="bg-blue-100 flex flex-col justify-center items-center w-full md:h-screen py-6">
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
