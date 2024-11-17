import React from 'react';
import { Loader2, Database, Server, Cog } from 'lucide-react';
import Image from 'next/image';
import genie from '../../../public/loading.png'
const CreatingProject = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 " >
      <div className="space-y-8 text-center mt-[30px]">
        {/* Title */}
        <h1 className="text-4xl font-bold text-primary/60 animate-fade-in">
          Creating Your Workspace
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-md animate-fade-in-delay text-lg">
          Please wait while we set up your environment. This may take a few moments...
        </p>
        <div className="flex  p-8  justify-between ">
        <Image
          priority
          height={200}
          src={genie}
          alt="genie"
          className="floating genie-image"
        />
        <div className="loader mt-[-30px] ml-[-75px]"></div>
      </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.5s ease-in forwards;
          animation-delay: 0.3s;
        }

        .animate-slide-in {
          opacity: 0;
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-slide-in-delay-1 {
          opacity: 0;
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: 0.2s;
        }

        .animate-slide-in-delay-2 {
          opacity: 0;
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: 0.4s;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CreatingProject;