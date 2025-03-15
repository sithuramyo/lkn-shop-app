import React from "react";
import { Input } from "../ui/input";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Heart, Settings, ShoppingCart, User } from "lucide-react";
import { AnimatedInput } from "./AnimatedInput";

const TopNavbar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-2 px-4 shadow-lg dark:shadow-gray-700 bg-opacity-10 backdrop-blur-lg">
      {/* <div className="text-lg font-bold ">MyApp</div> */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/lkn-logo.png" alt="LKN-LOGO" />
        </Avatar>
        <Link href="/" className="text-2xl font-bold">
          Lawkanat Thingan House
        </Link>
        <AnimatedInput
          type="text"
          placeholder="Search Products....."
          className="p-2 rounded-md text-black  w-80 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link
          href="/cart"
          className="relative hover:bg-accent hover:text-accent-foreground p-2 rounded-sm"
        >
          <div className="absolute rounded-full -top-1 -right-4 bg-primary min-w-5 h-5 text-black text-center text-sm px-1">
            10+
          </div>
          <ShoppingCart className="w-5 h-5" />
        </Link>
        <Link
          href="/cart"
          className="relative hover:bg-accent hover:text-accent-foreground p-2 rounded-sm"
        >
          <Settings className="w-5 h-5" />
        </Link>
        <Link
          href="/profile"
          className="relative bg-accent text-accent-foreground p-2 rounded-full"
        >
          <User className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
