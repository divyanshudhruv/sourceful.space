"use client";
import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Badge from "../ui/Badge";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 py-4 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={25}
                  height={25}
                ></Image>
              </span>
            </div>
            <span className="text-lg font-bold text-s">sourceful.space</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="font-medium text-xs text-gray-900 hover:text-gray-600"
          >
            New launch
          </a>

          <div className="relative group cursor-pointer">
            <button className="flex items-center  text-xs space-x-1 font-medium text-gray-900 hover:text-gray-600">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {/* Dropdown would go here */}
          </div>

          <a
            href="#"
            className="font-medium text-xs text-gray-900 hover:text-gray-600"
          >
            Trending
          </a>

          <div className="flex items-center space-x-1">
            <a
              href="#"
              className="font-medium text-xs text-gray-900 hover:text-gray-600"
            >
              Looking for funds
            </a>
            <Badge className="bg-green-100 text-green-800">New</Badge>
          </div>
        </div>

        {/* Auth Links */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="font-medium text-gray-900 hover:text-gray-600 text-xs "
          >
            Dashboard
          </a>
          <a
            href="#"
            className="font-medium text-white bg-black px-4 py-2 rounded-md text-xs hover:bg-gray-800 transition-colors"
          >
            Early Access
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300 cursor-pointer rounded-sm p-1"
            >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-4 ">
          <div className="space-y-1 px-2 cursor-pointer">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 cursor-pointer  "
            >
              New launch
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 cursor-pointer "
            >
              Categories
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Trending
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Looking for funds
              <Badge className="ml-2 bg-green-100 text-green-800">New</Badge>
            </a>
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
