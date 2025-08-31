/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.rows, "data?.rows");
        setSchools(data?.rows || []);
      })
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  return (
    <div className="p-8 bg-gray-100 w-[90%] shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Schools List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={school.image}
              alt={school.name}
              className="w-full h-40"
              
            />

            <h3 className="text-lg font-bold mt-2">{school.name}</h3>
            <p>{school.address}</p>
            <p className="text-gray-600">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
