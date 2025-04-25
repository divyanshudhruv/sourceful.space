import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

function StackedCircularFooter() {
  return (
    <footer className="bg-transparent py-2 scale-100 pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Icons.logo className="icon-class w-6" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#" className="hover:text-primary">
              About
            </a>
            <a href="#" className="hover:text-primary">
              Pins
            </a>
            <a href="#" className="hover:text-primary">
              Help
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
              <Github className="h-4 w-4" />
              <span className="sr-only cursor-pointer">Github</span>
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only cursor-pointer">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-fit max-w-md gap-4">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="mr-2 rounded-md border border-gray-300 px-4 py-2 h-11 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300"
                />
                </div>
                <Button className="rounded-md h-11 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300">  
                Subscribe
                </Button>
            </form>
            
          </div> */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 sourceful.space. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter };
