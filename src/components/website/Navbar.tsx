"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  User,  
  Mail, 
  FolderGit2,
  Trophy,
  Sparkles,
  WandSparkles
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/about', label: 'About', icon: <User size={20} /> },
    { href: '/achievements', label: 'Achievements', icon: <Trophy size={20} /> },
    { href: '/projects', label: 'Projects', icon: <FolderGit2 size={20} /> },
    { href: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full backg border-b-[1px] border-white/10 bg-[#36b466]  backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2 text-[#ffffff] hover:text-blue-600 transition-colors">
           <WandSparkles/> Writing Genie
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center flex-1 space-x-6 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="flex items-center space-x-2 text-black hover:text-blue-600 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;