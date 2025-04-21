import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import Button from "../ui/Button";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); // Trigger the fade-in effect when the component mounts
  }, []);

  return (
    <div
      className={`py-16 md:py-10 px-4 transition-container ${
        isLoaded ? "fade-in" : ""
      }`}
    >
      {/* Moving grid background */}
      <div className="moving-grid"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Announcement bar */}
        <div className="inline-flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200">
          <div className="flex items-center space-x-2 text-gray-800 text-xs">
            <span>⚡ Early Launch!</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-gray-600 text-xs">Apr 20, 2025</span>
          <div className="h-4 w-px bg-gray-300" />
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 flex items-center text-xs"
          >
            Changelog
            <svg
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#202020] mb-6 leading-tight max-w-[1100px] center mx-auto">
          Redefining <i>open-source</i>
          <br />
          with Sourceful
        </h1>

        {/* Subheading */}
        <p className="max-w-4xl mx-auto text-lg md:text-[22px] text-gray-500 mb-5 leading-[1.2] font-[300] ">
          Sourceful is your central space to explore the vast world of
          open-source projects. We're building a community-driven platform to
          make it easier than ever for developers, contributors, and enthusiasts
          to find promising projects, connect with creators, and fuel the future
          of collaborative technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-5">
          <Button variant="primary" className=" text-xs">
            Login
          </Button>
          <Button variant="secondary" className=" text-xs">
            Early Access
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-0">
          {/* Avatar Container */}
          <div className="relative flex -space-x-4">
            <img
              className="w-9 h-9 rounded-full border-2 border-white"
              src="https://www.svgrepo.com/download/331410/gitlab.svg"
              alt="Avatar 1"
            />
            <img
              className="w-9 h-9 rounded-full border-2 border-white"
              src="https://ai-bot.cn/wp-content/uploads/2025/02/Lovable-logo.png"
              alt="Avatar 2"
            />
            <img
              className="w-9 h-9 rounded-full border-2 border-white"
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
              alt="Avatar 3"
            />
            <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
