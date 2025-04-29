"use client";

import React from "react";

import "./index.css";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
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
import Button from "../components/ui/Button";

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
        <div className="pins-container">
          {/* <div className="concentric-circles">
            <div className="inner-circle"></div>
          </div> */}
          <div className="pin">
            <div className="og-image">
              <div className="invest">invest</div>
            </div>
            <h1>Sourceful 🌟</h1>
            <p>
              Sourceful is a platform that empowers creators to share and
              discover innovative ideas, fostering collaboration for everyone.
            </p>
            <div className="vote">
              <div className="button upvote">
          <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
          <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
          Visit &nbsp;
          <i
            className="ri-arrow-right-line"
            style={{ fontSize: "12px" }}
          ></i>
              </div>
            </div>
          </div>
          <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>InnoSpace 🚀</h1>
            <p>
              InnoSpace is a hub for innovators to connect, share projects, and
              inspire groundbreaking solutions.
            </p>
            <div className="vote">
              <div className="button upvote">
          <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
          <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
          Visit &nbsp;
          <i
            className="ri-arrow-right-line"
            style={{ fontSize: "12px" }}
          ></i>
              </div>
            </div>
          </div>
          <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>IdeaForge 💡</h1>
            <p>
              IdeaForge helps creators turn their concepts into reality by
              providing tools and a supportive community.
            </p>
            <div className="vote">
              <div className="button upvote">
              <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
              <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
              Visit &nbsp;
              <i
          className="ri-arrow-right-line"
          style={{ fontSize: "12px" }}
              ></i>
              </div>
            </div>
            </div>
            <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>CollabSphere 🤝</h1>
            <p>
              CollabSphere is a platform designed to bring teams together to
              brainstorm and execute innovative projects.
            </p>
            <div className="vote">
              <div className="button upvote">
              <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
              <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
              Visit &nbsp;
              <i
          className="ri-arrow-right-line"
          style={{ fontSize: "12px" }}
              ></i>
              </div>
            </div>
            </div>
            <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>ThinkTank 🧠</h1>
            <p>
              ThinkTank is a digital space for thinkers and doers to share
              insights and collaborate on impactful ideas.
            </p>
            <div className="vote">
              <div className="button upvote">
              <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
              <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
              Visit &nbsp;
              <i
          className="ri-arrow-right-line"
          style={{ fontSize: "12px" }}
              ></i>
              </div>
            </div>
            </div>
            <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>Visionary 👀</h1>
            <p>
              Visionary connects dreamers and visionaries to share their
              aspirations and make them a reality.
            </p>
            <div className="vote">
              <div className="button upvote">
              <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
              <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
              Visit &nbsp;
              <i
          className="ri-arrow-right-line"
          style={{ fontSize: "12px" }}
              ></i>
              </div>
            </div>
            </div>
            <div className="pin">
            <div className="og-image">
              <div className="badge"></div>
            </div>
            <h1>BrightIdeas ✨</h1>
            <p>
              BrightIdeas is a community-driven platform for sharing and
              exploring creative solutions to everyday challenges.
            </p>
            <div className="vote">
              <div className="button upvote">
              <i className="ri-arrow-up-line"></i>
              </div>
              <div className="button downvote">
              <i className="ri-arrow-down-line"></i>
              </div>
              <div className="button visit">
              Visit &nbsp;
              <i
          className="ri-arrow-right-line"
          style={{ fontSize: "12px" }}
              ></i>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
