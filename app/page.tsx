"use client";

import React from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import { MVP } from "./components/home/mvp";
import "./index.css";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* <MVP /> */}
        {/* Add more components here as needed */}
      </main>
    </div>
  );
}

export default Home;
