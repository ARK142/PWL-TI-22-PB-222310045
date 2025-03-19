import React from "react";
import ChapterOne from "../modules/chapter-1/ChapterOne";
import { Route, Routes } from "react-router-dom";

export default function BaseRoute() {
  return (
    <React.Suspense>
      <Routes>
        <Route index element={<ChapterOne />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </React.Suspense>
  );
}

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};
