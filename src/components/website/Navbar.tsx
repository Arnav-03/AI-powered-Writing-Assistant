"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  User,
  BadgeIndianRupee,
  WandSparkles,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ToggleSwitch";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/login");
        toast.success("Logout Successful");
      }
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error Logging out");
    }
  };

  const navItems = isLoggedIn
    ? [
        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { href: "/content", label: "Content", icon: <FileText size={20} /> },
        { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
      ]
    : [
        { href: "/", label: "Home", icon: <Home size={20} /> },
        { href: "/about", label: "About", icon: <User size={20} /> },
        { href: "/pricing", label: "Pricing", icon: <BadgeIndianRupee size={20} /> },
      ];

  return (
    <nav className="fixed top-0 left-0 w-full border-b-[2px] border-primary backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer text-2xl font-bold flex items-center gap-2 hover:text-primary/80 transition-colors text-primary"
          >
            <WandSparkles /> WritinGenie
          </div>

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

          {isLoggedIn ? null : (
            <Button onClick={() => router.push("/signup")} className="mx-2">
              Get Started
            </Button>
          )}
          <ModeToggle />

          <div className="md:hidden ml-2">
            <Button
              size="icon"
              className="text-primary-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile Menu with Animation */}
          <div
            className={`fixed inset-0 z-40 transform transition-transform bg-black/80 h-screen duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar with slide animation */}
            <div
              className={`absolute top-0 right-0 w-2/3 bg-background text-primary shadow-md h-screen flex flex-col text-lg px-4 py-6 transform transition-transform duration-50 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center border-b-2 border-primary pb-4">
                <div className="text-2xl font-bold flex items-center gap-2">
                  <WandSparkles /> WritinGenie
                </div>
                <Button onClick={() => setIsMenuOpen(false)} size="icon">
                  <X />
                </Button>
              </div>
              <div className="flex flex-col mt-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 font-bold hover:text-primary/80 transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                {isLoggedIn ? (
                  <Button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="mt-4"
                  >
                    Log Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="mt-4"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
