"use client";

import React from "react";

import "./index.css";
import Image from "next/image";
import {
  BookmarkMinusIcon,
  Github,
  HomeIcon,
  IdCard,
  Linkedin,
  LucideHome,
  Search,
  Settings2Icon,
  Twitter,
} from "lucide-react";

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
import supabase from "./../services/supabase";
import Avvvatars from "avvvatars-react";

// import { ShineBorder } from "@/components/magicui/shine-border";
// import { Meteors } from "@/components/magicui/meteors";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); // Trigger the fade-in effect when the component mounts
  }, []);

  return (
    <div className={` `}>
      {/* <SmoothCursor /> */}

      <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" />

      <div className={`main `}>
        <div className="concentric-circles">
          <div className="inner-circle"></div>
        </div>
        <div className="navbar">
          <div className="left">
            <div className="item">
              <div className="canvas">
                <Image src={"/logo.png"} alt="logo" width={23} height={23} />
              </div>
            </div>
            <div className="nav-small">
              <div className="item active">All pins</div>
              <div className="item">Newest</div>
              <div className="item">Realtime</div>
              <div className="item">Open to investment</div>
            </div>
            {/* <div className="item"> <Settings2Icon size={19} /></div> */}
          </div>
          <div className="right">
            {" "}
            <div className="search">
              <Search size={20} />
            </div>
            <div className="profile">
              <Image
                style={{ borderRadius: "100%" }}
                alt="profile-pic"
                src="https://i.pinimg.com/736x/19/96/3d/19963db6acedc3a01eb8126de0bdf0db.jpg"
                width={35}
                height={35}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
