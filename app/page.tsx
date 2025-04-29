"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
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
import { TextAnimate } from "@/components/magicui/text-animate";
import supabase from "./services/supabase";

const TopText = React.memo(() => (
  <>
    <div className="textTop1">
      <TextAnimate animation="blurInUp" by="character" once delay={0}>
        Invest.
      </TextAnimate>
    </div>
    <div className="textTop2">
      <TextAnimate animation="blurInUp" by="character" once delay={0.2}>
        Develop.
      </TextAnimate>
      <div className="canvas">
        <Image src={"/logo.png"} alt="logo" width={42} height={42} />
      </div>
      <TextAnimate animation="blurInUp" by="character" once delay={0.4}>
        Redefine.
      </TextAnimate>
    </div>
  </>
));

const DialogBox = ({
  id,
  title,
  description,
  buttonText,
}: {
  id: string;
  title: string;
  description: string;
  buttonText: string;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <button style={{ display: "none" }} id={id}></button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button
          className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300 cursor-none"
          style={{ borderRadius: "0.375rem" }}
          onClick={(e) => {
            e.preventDefault();
            const dialog = e.currentTarget.closest("[data-state='open']");
            if (dialog) {
              dialog.dispatchEvent(new Event("close", { bubbles: true }));
            }
          }}
        >
          {buttonText}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsLoaded(true); // Trigger the fade-in effect when the component mounts
  }, []);

  const addEarlyAccess = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email address.");
      const emailInput = document.querySelector<HTMLInputElement>("#email");
      emailInput?.classList.add("border-red-500");
      emailInput?.focus();
      return;
    }

    try {
      const { data, error } = await supabase
        .from("early_access")
        .insert([{ email }]);

      if (error) {
        console.error("Error adding email to early access:", error.message);
        document.getElementById("dialog-trigger-error")?.click();
      } else {
        setEmail(""); // Clear the input field
        console.log(data);
        document.getElementById("dialog-trigger")?.click();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SmoothCursor />
      <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" />

      <div className="main">
        <div className="concentric-circles">
          <div className="inner-circle"></div>
        </div>

        <div
          className={`container transition-container ${
            isLoaded ? "fade-in" : ""
          }`}
        >
          <TopText />
          <div className="textBottom">
            {
              "A dynamic platform where open-source innovators and investors\n\nunite to collaborate, contribute, and drive the evolution of\n\ncutting-edge collaborative technologies on a global scale."
            }
          </div>
          <form
            className="inputContainer"
            onSubmit={(e) => {
              e.preventDefault();
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(email)) {
                addEarlyAccess();
              }
            }}
          >
            <div className="input">
              <div
                className="label"
                id="input_label"
                style={{
                  color:
                    email.length === 0 ||
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                      ? "inherit"
                      : "inherit",
                }}
              >
                {email.length === 0
                  ? "Your email"
                  : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "Your email is valid"
                  : "Enter a valid email"}
              </div>
              <input
                type="text"
                id="email"
                placeholder="me@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <DialogBox
                id="dialog-trigger"
                title="Early Access"
                description="We have added you to our waitlist. Gain early access to our features here. Click access now when you're ready."
                buttonText="Access now"
              />
              <DialogBox
                id="dialog-trigger-error"
                title="Error"
                description="You are already on the waitlist, or an error occurred. Please wait for the next feature update."
                buttonText="Got it"
              />
            </div>
            <button
              className="button focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300 cursor-none"
              type="submit"
            >
              Request early access
            </button>
          </form>
        </div>
        <div className="socialsContainer">
          <Link
            href="https://github.com/divyanshudhruv"
            target="_blank"
            className="cursor-none"
          >
            <div className="item cursor-none">
              <Github size={17} />
            </div>
          </Link>
          <Link
            href="https://linkedin.com/in/divyanshudhruv"
            target="_blank"
            className="cursor-none"
          >
            <div className="item cursor-none">
              <Linkedin size={17} />
            </div>
          </Link>
          <Link href="#" className="cursor-none">
            <div className="item cursor-none">
              <Twitter size={17} />
            </div>
          </Link>
        </div>
        <div className="footer">
          Built by <span>divyanshudhruv</span>
        </div>
      </div>
    </div>
  );
}

export default Home;