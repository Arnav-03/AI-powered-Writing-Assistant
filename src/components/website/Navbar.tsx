"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  User,
  Mail,
  FolderGit2,
  Trophy,
  Sparkles,
  WandSparkles,
  Edit,
  Tags,
  BadgeIndianRupee,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ToggleSwitch";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/about", label: "About", icon: <User size={20} /> },
    {
      href: "/pricing",
      label: "Pricing",
      icon: <BadgeIndianRupee size={20} />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full  border-b-[2px] border-primary backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2 hover:text-primary/80 transition-colors text-primary">
            <WandSparkles /> WritinGenie
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center flex-1 space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-primary font-bold hover:text-primary/80 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <Button className="mx-2">Get Started</Button>
          <ModeToggle />
          {/* Mobile Menu Toggler */}
          <div className="md:hidden ml-2">
            <Button
              size='icon'
              className="text-primary-foreground "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed top-0 left-0 w-full  shadow-md z-40  h-screen text-primary bg-primary-foreground  ">
              <div className="flex justify-between border-b-2 border-primary p-4">
                <div className="text-2xl font-bold flex items-center gap-2 hover:text-primary/80 transition-colors text-primary">
                  <WandSparkles /> WritinGenie
                </div>
                <Button onClick={() => setIsMenuOpen(false)} size="icon">
                  <X />
                </Button>
              </div>
              <div className="flex flex-col text-lg pt-20 items-center h-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 font-bold hover:text-primary/80 transition-colors mb-4"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
