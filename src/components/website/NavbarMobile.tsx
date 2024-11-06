"use client"
import React from 'react';
import {
  Home, User,
  FolderGit2,
  Mail,
  Trophy,
} from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/about', label: 'About', icon: <User size={20} /> },
    { href: '/achievements', label: 'Achievements', icon: <Trophy size={20} /> },
    { href: '/projects', label: 'Projects', icon: <FolderGit2 size={20} /> },
    { href: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ];



  return (
    <nav className="fixed bottom-0 w-4/5 rounded-full bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg z-50 mb-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Main Navigation Items */}
          <div className="flex-1 flex justify-around items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;