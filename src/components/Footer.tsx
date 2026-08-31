import React from 'react';
import { Laugh } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 py-8 border-t border-zinc-800 bg-[#050505] text-zinc-500 text-xs font-mono uppercase tracking-widest">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Laugh className="w-4 h-4 text-[#FACC15]" />
          <span>CHUCKLEBOX &copy; {new Date().getFullYear()} — THE DAILY HUMOR RIOT</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500">
          <span>POWERED BY OPEN JOKE APIS</span>
          <span>•</span>
          <span className="text-[#FACC15]">LAUGH MORE</span>
        </div>
      </div>
    </footer>
  );
};

