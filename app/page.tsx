"use client";

import React from "react";

import "./index.css";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Link from "next/link";
// import { Meteors } from "@/components/magicui/meteors";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SmoothCursor />
      {/* <Meteors /> */}

      {/* <Navbar />
      <main className="flex-grow">
        <Hero />
       
      </main> */}
      <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" />

      <div className="main">
        {/* <Meteors /> */}
        <div className="concentric-circles">
          <div className="inner-circle"></div>
        </div>

        <div className="container">
          <div className="textTop1">Invest.</div>
          <div className="textTop2">
            Develop.{" "}
            <div className="canvas">
              {" "}
              <Image
                src={"/logo.png"}
                alt="logo"
                width={42}
                height={42}
              ></Image>
            </div>{" "}
            Redefine.
          </div>
          <div className="textBottom">
            Discover Sourceful: A hub for open-source enthusiasts to connect,
            contribute, and shape the future of collaborative technology
            worldwide.
          </div>
          <div className="inputContainer">
            <div className="input">
              {" "}
              <input
                type="text"
                placeholder="me@email.com"
                className="focus:outline-none focus:ring-1 focus:ring-offset-3 focus:ring-gray-300"
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300">
                  Request early access
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Early Access</DialogTitle>
                  <DialogDescription>
                    Gain early access to our features here. Click access now
                    when you&apos;re ready. We are coming soon!
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <button
                    className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300"
                    style={{ borderRadius: "0.375rem" }}
                  >
                    Access now
                  </button>{" "}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="socialsContainer">
          <Link href="https://github.com/divyanshudhruv" target="_blank">
            {" "}
            <div className="item">
              <Github size={17} />
            </div>
          </Link>
          <Link href="https://linkedin.com/in/divyanshudhruv" target="_blank">
            <div className="item">
              <Linkedin size={17} />
            </div>
          </Link>

          <div className="item">
            <Twitter size={17} />
          </div>
        </div>
        <div className="footer">
          Built by <span>divyanshudhruv</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
