
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
           <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center mb-6">
              ThinkPad <span className="thinkpad-red ml-1">YAY!!</span>
              <div className="w-2 h-2 rounded-full bg-[#e2231a] ml-1 mb-4"></div>
            </Link>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
              ThinkPad YAY!! is an independent hub for enthusiasts. We promote sustainable tech by encouraging repair, reselling, and the celebration of legendary design.
            </p>
            <div className="flex gap-4">
               <a href="javascript:void(0)" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
               <a href="javascript:void(0)" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"><i className="fab fa-reddit-alien"></i></a>
               <a href="javascript:void(0)" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"><i className="fab fa-discord"></i></a>
            </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Shop</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/new" className="hover:text-blue-600 transition-colors">New ThinkPads</Link></li>
            <li><Link to="/used" className="hover:text-blue-600 transition-colors">Resell Marketplace</Link></li>
            <li><Link to="/parts" className="hover:text-blue-600 transition-colors">Spare Parts</Link></li>
            <li><Link to="/parts" className="hover:text-blue-600 transition-colors">Refurbishment Kits</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Resources</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/forum" className="hover:text-blue-600 transition-colors">Enthusiast Forums</Link></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600 transition-colors">Troubleshooting Guide</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600 transition-colors">Verification Process</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600 transition-colors">Shipping Partners</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} ThinkPad YAY!! Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="javascript:void(0)" className="hover:text-black">Privacy Policy</a>
          <a href="javascript:void(0)" className="hover:text-black">Terms of Service</a>
          <a href="javascript:void(0)" className="hover:text-black">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;