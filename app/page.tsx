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
import { useEffect, useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

// import { ShineBorder } from "@/components/magicui/shine-border";
// import { Meteors } from "@/components/magicui/meteors";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true); // Trigger the fade-in effect when the component mounts
  }, []);

  return (
    <div className={`min-h-screen flex flex-col  `}>
      <SmoothCursor />
      {/* <Meteors /> */}

      {/* <Navbar />
      <main className="flex-grow">
        <Hero />
       
      </main> */}
      <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" />

      <div className={`main  `}>
        {/* <Meteors /> */}
        <div className="concentric-circles">
          <div className="inner-circle"></div>
        </div>

        <div
          className={`container transition-container ${
            isLoaded ? "fade-in" : ""
          }`}
        >
          <div className="textTop1">
            {" "}
            <TextAnimate animation="blurInUp" by="character" once delay={0}>
              Invest.
            </TextAnimate>{" "}
          </div>
          <div className="textTop2">
            <TextAnimate animation="blurInUp" by="character" once delay={0.2}>
              Develop.
            </TextAnimate>
            <div className="canvas">
              {" "}
              <Image
                src={"/logo.png"}
                alt="logo"
                width={42}
                height={42}
              ></Image>
            </div>{" "}
            <TextAnimate animation="blurInUp" by="character" once delay={0.4}>
              Redefine.
            </TextAnimate>
          </div>
          <div className="textBottom">
              {
                "A vibrant hub for open-source enthusiasts and investors to\n\nconnect,collaborate, contribute, and shape the future of\n\ninnovative collaborative technology worldwide."
              }
          </div>
          <div className="inputContainer">
            {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}

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
                <button className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300 cursor-none">
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
                    className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300 cursor-none"
                    style={{ borderRadius: "0.375rem" }}
                  >
                    Access now
                  </button>{" "}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="socialsContainer ">
          <Link href="https://github.com/divyanshudhruv" target="_blank">
            {" "}
            <div className="item cursor-none">
              <Github size={17} />
            </div>
          </Link>
          <Link href="https://linkedin.com/in/divyanshudhruv" target="_blank">
            <div className="item cursor-none">
              <Linkedin size={17} />
            </div>
          </Link>

          <div className="item cursor-none">
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
