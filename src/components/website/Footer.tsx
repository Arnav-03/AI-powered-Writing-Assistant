"use client";
import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, WandSparkles, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Sign Up", href: "/signup" },
      { label: "Login", href: "/login" },
    ],
  };

  const developerLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/Arnav-03",
      label: "Github",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/arnavarora3/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:arnavarora0003@gmail.com",
      label: "Mail",
    },
  ];

  return (
    <footer className="bg-background border-t-2  border-primary mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand section */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <WandSparkles />
              <span>WritinGenie</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empower your writing with AI-driven creativity. Transform your
              ideas into compelling content with WritinGenie's advanced AI
              writing assistant.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Developer</h3>
            <p className="text-muted-foreground mb-4">
              Designed and developed by Arnav Arora
            </p>
            <div className="flex space-x-4 ">
              {developerLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors "
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary/20 mt-8 pt-8">
          <div className="flex flex-col  items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} WritinGenie. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by Arnav Arora
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
