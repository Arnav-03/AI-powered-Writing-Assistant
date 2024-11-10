"use client"
import React from 'react';
import { Ghost, Home, Search, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import genie from '../../public/notfound2.png'
const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">

      <Image
        height={200}
        src={genie}
        alt="genie"
        className="floating genie-image mb-4"
      />

        {/* Main Content */}
        <div className="space-y-4 mb-12 text-center">
          <h2 className="text-3xl font-semibold opacity-90 chewy">
            Page Not Found
          </h2>
          <p className="opacity-60 font-bold max-w-md mx-auto">
            Oops! Looks like you've ventured into the digital void. 
            The page you're looking for has vanished into thin air.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3  text-white rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg  transition-colors"
          >
            <Home size={20} />
            Home Page
          </button>
        </div>
    </div>
  );
};

export default NotFound;